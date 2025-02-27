import { NextFunction, Request, Response } from "express";
import { client } from "..";
import AppError from "../middleware/ErrorHandlerMiddleware";

export const SearchNotes = async (req: Request, res: Response, next: NextFunction) => {
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
                  contains: q,
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
      return next(new AppError("No notes Found", 404));
    }

    res.status(200).json(notes);
  } catch (error) {
    return next(error);
  }
};

export const getAllNotes = async (req: Request, res: Response, next: NextFunction) => {
  const { userId } = req.user;

  try {
    const allNotes = await client.note.findMany({
      where: {
        userId: userId,
        inTrash: false,
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        tags: true,
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
      return next(new AppError("No notes Found", 404));
    }

    res.status(200).json(notesTree);
  } catch (error) {
    return next(error);
  }
};

export const getGraphNotes = async (req: Request, res: Response, next: NextFunction) => {
  const { userId } = req.user;

  try {
    const notes = await client.note.findMany({
      where: {
        userId: userId,
        inTrash: false,
      },
    });

    if (notes.length === 0) {
      return next(new AppError("No notes Found", 404));
    }

    res.status(200).json(notes);
  } catch (error) {
    return next(error);
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

export const getSingleNote = async (req: Request, res: Response, next: NextFunction) => {
  const { noteId } = req.params;
  const { userId } = req.user;

  try {
    const note = await client.note.findUnique({
      where: {
        id: noteId,
        userId: userId,
        inTrash: false,
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
            imageModule: true,
            TodoModule: true,
            DrawingModule: true,
          },
        },
      },
    });
    if (!note) {
      return next(new AppError("No note with that Id found", 404));
    }

    const breadCrumbs = await getBreadcrumbs(noteId, userId);

    res.status(200).json({ ...note, breadCrumbs });
  } catch (error) {
    return next(error);
  }
};

export const createTextNote = async (req: Request, res: Response, next: NextFunction) => {
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
    return next(error);
  }
};

export const updateNote = async (req: Request, res: Response, next: NextFunction) => {
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
            imageModule: true,
            TodoModule: true,
            DrawingModule: true,
          },
        },
      },
    });
    const breadCrumbs = await getBreadcrumbs(noteId, userId);

    res.status(201).json({ ...updatedNote, breadCrumbs });
  } catch (error) {
    return next(error);
  }
};

export const duplicateNote = async (req: Request, res: Response, next: NextFunction) => {
  const { noteId } = req.body;
  const { userId } = req.user;

  try {
    const noteToBeDuplicated = await client.note.findUnique({
      where: { id: noteId },
      include: {
        modules: {
          include: {
            textModule: true,
            imageModule: true,
            TodoModule: true,
            DrawingModule: true,
          },
        },
        tags: true,
      },
    });

    if (!noteToBeDuplicated) {
      return next(new AppError("Note not found", 404));
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
    return next(error);
  }
};

export const moveNote = async (req: Request, res: Response, next: NextFunction) => {
  const { noteId, parentNoteId } = req.body;
  const { userId } = req.user;

  try {
    const movedNote = await client.note.update({
      where: { id: noteId, userId: userId },
      data: { parentNoteId: parentNoteId },
    });

    res.status(200).json(movedNote);
  } catch (error) {
    return next(error);
  }
};
