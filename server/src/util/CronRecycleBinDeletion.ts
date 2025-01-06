import cron from "node-cron";
import { client } from "..";

const deleteAllRecycleBinNotes = async () => {
  try {
    const currentDate = new Date();

    const sevenDaysAgo = new Date(currentDate.getTime() - 7 * 24 * 60 * 60 * 1000);
    // const tenSeconds = new Date(currentDate.getTime() - 10 * 1000);

    await client.note.deleteMany({
      where: {
        inTrash: true,
        trashedAt: {
          lte: sevenDaysAgo,
        },
      },
    });
    console.log("Deleted all notes in the recycle bin.");
  } catch (error) {
    console.error("Error deleting notes from the recycle bin:", error);
  }
};

cron.schedule(`0 0 * * *`, async () => {
  await deleteAllRecycleBinNotes();
});
