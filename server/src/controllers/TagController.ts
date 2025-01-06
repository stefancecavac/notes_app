import { Request, Response } from "express";
import { client } from "..";

const getAllTags = async (req: Request, res: Response) => {
  const { userId } = req.user;

  try {
    const AllTags = await client.tag.findMany({
      where: {
        userId: userId,
      },
    });

    res.status(200).json(AllTags);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const createTag = async (req: Request, res: Response) => {
  const { noteId } = req.params;
  const { userId } = req.user;

  const { name, textColor, backgroundColor } = req.body;

  try {
    const tagExists = await client.tag.findFirst({
      where: {
        name: name,
        userId: userId,
      },
    });

    if (tagExists) {
      const updatedNote = await client.note.update({
        where: {
          id: noteId,
          userId: userId,
        },
        data: {
          tags: {
            connect: {
              id: tagExists.id,
            },
          },
        },
        include: {
          tags: true,
          modules: {
            include: {
              textModule: true,
            },
          },
        },
      });
      console.log(updatedNote);
      res.status(201).json(updatedNote);
    } else {
      const updatedNote = await client.note.update({
        where: {
          id: noteId,
          userId: userId,
        },
        data: {
          tags: {
            create: {
              userId: userId,
              name: name,
              textColor: textColor,
              backgroundColor: backgroundColor,
            },
          },
        },
        include: {
          tags: true,
          modules: {
            include: {
              textModule: true,
            },
          },
        },
      });
      console.log(updatedNote);

      res.status(201).json(updatedNote);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const deleteTag = async (req: Request, res: Response) => {
  const { noteId } = req.params;
  const { userId } = req.user;
  const { tagId } = req.body;

  try {
    const updatedNote = await client.note.update({
      where: {
        id: noteId,
        userId: userId,
      },
      data: {
        tags: {
          disconnect: {
            id: tagId,
          },
        },
      },
      include: {
        tags: true,
        modules: {
          include: {
            textModule: true,
          },
        },
      },
    });

    res.status(200).json(updatedNote);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export { getAllTags, createTag, deleteTag };
