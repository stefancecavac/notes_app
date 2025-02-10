import { Request, Response } from "express";
import { client } from "..";

const SearchNotes = async (req: Request, res: Response) => {
  const q = req.query.q as string;
  const { userId } = req.user;

  try {
    const notes = await client.note.findMany({
      where: {
        inTrash: false,
        userId: userId,
        OR: [
          {
            title: {
              contains: q,
              mode: "insensitive",
            },
          },
          {
            tags: {
              some: {
                name: {
                  equals: q,
                  mode: "insensitive",
                },
              },
            },
          },
        ],
      },
      include: {
        tags: true,
      },
    });

    if (notes.length === 0) {
      return res.status(404).json({ message: "No notes found" });
    }

    res.status(200).json(notes);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

const getAllNotes = async (req: Request, res: Response) => {
  const { userId } = req.user;

  try {
    const allNotes = await client.note.findMany({
      where: {
        userId: userId,
        inTrash: false,
      },
      select: {
        id: true,
        title: true,
        parentNoteId: true,
        icon: true,
        favourite: true,
      },
    });

    const noteMap: Record<string, any[]> = {};
    for (const note of allNotes) {
      const parentId = note.parentNoteId || "root";
      if (!noteMap[parentId]) {
        noteMap[parentId] = [];
      }
      noteMap[parentId].push({ ...note, childNotes: [] });
    }

    const buildTree = (parentId: string): any[] => {
      return (noteMap[parentId] || []).map((note) => ({
        ...note,
        childNotes: buildTree(note.id),
      }));
    };

    const notesTree = buildTree("root");

    if (notesTree.length === 0) {
      return res.status(404).json({ message: "No notes found" });
    }

    res.status(200).json(notesTree);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

const getGraphNotes = async (req: Request, res: Response) => {
  const { userId } = req.user;

  try {
    const notes = await client.note.findMany({
      where: {
        userId: userId,
        inTrash: false,
      },
    });

    if (notes.length === 0) {
      return res.status(404).json({ message: "No notes found" });
    }

    res.status(200).json(notes);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

interface Breadcrumb {
  noteId: string;
  noteTitle: string;
  icon: string;
}

const getBreadcrumbs = async (noteId: string, userId: number): Promise<Breadcrumb[]> => {
  const note = await client.note.findUnique({
    where: { id: noteId },
    include: {
      parentNote: true,
    },
  });

  if (!note) {
    return [];
  }

  if (!note.parentNoteId) {
    return [{ noteId: note.id, noteTitle: note.title, icon: note.icon }];
  }
  const parentBreadcrumbs = await getBreadcrumbs(note.parentNoteId, userId);

  return [...parentBreadcrumbs, { noteId: note.id, noteTitle: note.title, icon: note.icon }];
};

const getSingleNote = async (req: Request, res: Response) => {
  const { noteId } = req.params;
  const { userId } = req.user;

  try {
    const note = await client.note.findUnique({
      where: {
        id: noteId,
        userId: userId,
      },
      include: {
        tags: true,
        childNotes: {
          where: {
            inTrash: false,
          },
        },

        modules: {
          orderBy: { order: "asc" },
          include: {
            textModule: true,
          },
        },
      },
    });
    if (!note) {
      return res.status(404).json({ message: "No note with that id found" });
    }

    const breadCrumbs = await getBreadcrumbs(noteId, userId);

    res.status(200).json({ ...note, breadCrumbs });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

const createTextNote = async (req: Request, res: Response) => {
  const { title, color, parentNoteId } = req.body;
  const { userId } = req.user;

  try {
    const createdNote = await client.note.create({
      data: {
        parentNoteId: parentNoteId,
        title: title,
        userId: userId,
        color: color,
        modules: {
          create: {
            type: "TEXT",
            order: 1,
            textModule: {
              create: {
                content: "",
              },
            },
          },
        },
      },
      include: {
        childNotes: {
          select: {
            id: true,
            title: true,
          },
        },
      },
    });

    res.status(201).json(createdNote);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

const updateNote = async (req: Request, res: Response) => {
  const { noteId } = req.params;
  const { title, color, icon } = req.body;
  const { userId } = req.user;

  try {
    const updatedNote = await client.note.update({
      where: {
        id: noteId,
        userId: userId,
      },
      data: {
        title: title,
        color: color,
        icon: icon,
      },
      include: {
        tags: true,
        childNotes: {
          where: {
            inTrash: false,
          },
          select: {
            title: true,
            parentNoteId: true,
            id: true,
          },
        },
        modules: {
          include: {
            textModule: true,
          },
        },
      },
    });
    const breadCrumbs = await getBreadcrumbs(noteId, userId);

    res.status(201).json({ ...updatedNote, breadCrumbs });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

const duplicateNote = async (req: Request, res: Response) => {
  const { noteId } = req.body;
  const { userId } = req.user;

  try {
    const noteToBeDuplicated = await client.note.findUnique({
      where: { id: noteId },
      include: {
        modules: {
          include: {
            textModule: true,
          },
        },
        tags: true,
      },
    });

    if (!noteToBeDuplicated) {
      return res.status(404).json({ message: "Note not found" });
    }

    const duplicatedNote = await client.note.create({
      data: {
        userId: userId,
        title: `${noteToBeDuplicated.title} (copy)`,
        color: noteToBeDuplicated.color,
        icon: noteToBeDuplicated.icon,
        favourite: noteToBeDuplicated.favourite,
        parentNoteId: noteToBeDuplicated.parentNoteId,
        tags: {
          connect: noteToBeDuplicated.tags.map((tag) => ({ id: tag.id })),
        },
        modules: {
          create: noteToBeDuplicated.modules.map((module) => ({
            type: module.type,
            order: module.order,
            textModule: module.textModule
              ? {
                  create: {
                    content: module.textModule.content,
                  },
                }
              : undefined,
          })),
        },
      },
    });

    res.status(200).json(duplicatedNote);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const moveNote = async (req: Request, res: Response) => {
  const { noteId, parentNoteId } = req.body;
  const { userId } = req.user;

  try {
    const movedNote = await client.note.update({
      where: { id: noteId, userId: userId },
      data: { parentNoteId: parentNoteId },
    });

    res.status(200).json(movedNote);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

// const deleteNote = async (req: Request, res: Response) => {
//   const { noteId } = req.params;
//   const { userId } = req.user;

//   try {
//     const noteExists = await client.note.findUnique({
//       where: {
//         id: noteId,
//       },
//     });
//     if (!noteExists) {
//       return res.status(404).json({ message: "Note with that id not found" });
//     }
//     await client.note.delete({
//       where: {
//         id: noteId,
//         userId: userId,
//       },
//     });

//     res.status(200).json({ message: "Note successfuly deleted" });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({ message: "Something went wrong" });
//   }
// };

export { getAllNotes, getSingleNote, createTextNote, updateNote, SearchNotes, duplicateNote, getGraphNotes, moveNote };
