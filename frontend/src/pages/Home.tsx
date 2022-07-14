import { FunctionComponent } from "react";
import "../App.css";
import { JournalEntryType } from "../App";
import { EntryForm } from "../components/entryForm";

interface HomeProps {
  myJournalEntries: JournalEntryType[];
  setMyJournalEntries: (myJournalEntries: JournalEntryType[]) => void;
}

export const Home: FunctionComponent<HomeProps> = ({ myJournalEntries, setMyJournalEntries }) => {
  return (
    <>
      <EntryForm
        myJournalEntries={myJournalEntries}
        setMyJournalEntries={setMyJournalEntries}
      ></EntryForm>
      {myJournalEntries?.map((myJournalEntry) => (
        <div key={myJournalEntry.id}>
          <p>{myJournalEntry.entry}</p>
          <p>{myJournalEntry.feelingState}</p>
        </div>
      ))}
    </>
  );
};
