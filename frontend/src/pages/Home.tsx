import { FunctionComponent, useContext } from "react";
import "../App.css";
import { JournalEntryType } from "../contexts/JournalEntriesContext";
import { EntryForm } from "../components/entryForm";
import { JournalEntryCard } from "../components/JournalEntryCard";
import { JournalEntriesContext } from "../contexts/JournalEntriesContext";

export const Home: FunctionComponent = () => {
  const { myJournalEntries, setMyJournalEntries } = useContext(JournalEntriesContext);
  const handleNewJournalEntry = (newJournalEntry: JournalEntryType, isEditting: boolean) => {
    if (!isEditting) setMyJournalEntries([...myJournalEntries, newJournalEntry]);
    // else setMyJournalEntries([...myJournalEntries]);
  };
  return (
    <>
      <EntryForm handleNewJournalEntry={handleNewJournalEntry}></EntryForm>
      {myJournalEntries?.map((myJournalEntry) => (
        <JournalEntryCard
          key={myJournalEntry.id}
          myJournalEntry={myJournalEntry}
          handleNewJournalEntry={handleNewJournalEntry}
        />
      ))}
    </>
  );
};
