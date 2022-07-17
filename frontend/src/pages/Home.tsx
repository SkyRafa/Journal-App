import { FunctionComponent } from "react";
import "../App.css";
import { JournalEntryType } from "../App";
import { EntryForm } from "../components/entryForm";
import { JournalEntryCard } from "../components/JournalEntryCard";

interface HomeProps {
  myJournalEntries: JournalEntryType[];
  setMyJournalEntries: (myJournalEntries: JournalEntryType[]) => void;
}

export const Home: FunctionComponent<HomeProps> = ({ myJournalEntries, setMyJournalEntries }) => {
  const handleNewJournalEntry = (newJournalEntry: JournalEntryType) => {
    setMyJournalEntries([...myJournalEntries, newJournalEntry]);
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
