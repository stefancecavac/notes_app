import { Request, Response } from "express";
import { client } from "..";

const getAllFavouriteNotes = async (req: Request, res: Response) => {
  const { userId } = req.user;

  try {
    const notes = await client.note.findMany({
      where: {
        userId: userId,
        favourite: true,
        inTrash: false,
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

const FavouriteNote = async (req: Request, res: Response) => {
  const { noteId } = req.body;

  try {
    const favouriteNote = await client.note.update({
      where: {
        id: noteId,
      },
      data: {
        favourite: true,
      },
      include: {
        childNotes: {
          where: { inTrash: false },
          select: {
            title: true,
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

    res.status(200).json(favouriteNote);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const UnFavouriteNote = async (req: Request, res: Response) => {
  const { noteId } = req.body;

  try {
    const unfavouriteNote = await client.note.update({
      where: {
        id: noteId,
        inTrash: false,
      },
      data: {
        favourite: false,
      },
      include: {
        childNotes: {
          where: { inTrash: false },
          select: {
            title: true,
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

    res.status(200).json(unfavouriteNote);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export { FavouriteNote, UnFavouriteNote, getAllFavouriteNotes };
