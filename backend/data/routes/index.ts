import express from "express";
const router = express.Router();

import journalEntries from "./journalEntries";

router.use("/journalEntries", journalEntries);

export default router;
