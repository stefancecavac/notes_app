import { Request, Response } from "express";
import { client } from "..";

const getAllNotesFromRecycleBin = async (req: Request, res: Response) => {
  const { userId } = req.user;

  try {
    const notes = await client.note.findMany({
      where: {
        userId: userId,
        inTrash: true,
      },
    });
    if (notes.length === 0) {
      return res.status(404).json({ message: "No notes in Recycle Bin" });
    }
    res.status(200).json(notes);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

const moveToRecycleBin = async (req: Request, res: Response) => {
  const { noteId } = req.body;
  const { userId } = req.user;

  try {
    const noteExists = await client.note.findUnique({
      where: {
        id: noteId,
      },
    });
    if (!noteExists) {
      return res.status(404).json({ message: "Note with that id not found" });
    }
    const moveChildrenToTrash = async (noteId: string) => {
      const children = await client.note.findMany({
        where: {
          parentNoteId: noteId,
        },
      });

      for (const child of children) {
        await client.note.update({
          where: {
            id: child.id,
          },
          data: {
            inTrash: true,
          },
        });

        await moveChildrenToTrash(child.id);
      }
    };

    const note = await client.note.update({
      where: {
        id: noteId,
        userId: userId,
      },
      data: {
        inTrash: true,
        trashedAt: new Date(),
      },
      include: {
        tags: true,
        childNotes: true,
      },
    });

    await moveChildrenToTrash(noteId);

    res.status(200).json(note);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

const restoreFromRecycleBin = async (req: Request, res: Response) => {
  const { noteId } = req.body;
  const { userId } = req.user;

  try {
    const noteExists = await client.note.findUnique({
      where: {
        id: noteId,
      },
    });
    if (!noteExists) {
      return res.status(404).json({ message: "Note with that id not found" });
    }
    await client.note.update({
      where: {
        id: noteId,
        userId: userId,
      },
      data: {
        inTrash: false,
      },
    });

    res.status(200).json({ message: "Note successfuly restored" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export { getAllNotesFromRecycleBin, moveToRecycleBin, restoreFromRecycleBin };
