import express from "express";
const router = express.Router();
import { runQuery } from "../../utils/serverFunctions";
import { requiredScopes } from "express-oauth2-jwt-bearer";
const readEntriesScope = requiredScopes("read:journalEntries");
// const writeEntriesScope = requiredScopes("read:journalEntries");
import { JournalEntry } from "../sequelize-connect";

router.get(`/`, readEntriesScope, async (req, res) => {
  // const result = await runQuery("SELECT * FROM journalEntries WHERE id = 1");
  // res.send(result.response[0]);
  try {
    let journalentry = await JournalEntry.findAll({ where: { emailHashed: req.query.email } });
    res.status(201).send(journalentry);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.post(`/`, readEntriesScope, async (req, res) => {
  try {
    let journalentry = await JournalEntry.create(req.body);
    res.status(201).send(journalentry);
  } catch (e) {
    res.status(400).send(e);
  }
});

export default router;
