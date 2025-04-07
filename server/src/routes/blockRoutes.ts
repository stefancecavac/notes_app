import express from "express";
import { validate } from "../middleware/validation";
import { deleteBlockController, updateBlockController } from "../controllers/blockController";
import { blocksTableSchema } from "../db/schema/blocks";

const router = express.Router();

router.patch("/update", validate({ body: blocksTableSchema.pick({ id: true, properties: true, type: true }) }), updateBlockController);

router.delete("/", validate({ body: blocksTableSchema.pick({ id: true }) }), deleteBlockController);

export default router;
