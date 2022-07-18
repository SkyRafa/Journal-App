import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { JournalEntryType } from "../contexts/JournalEntriesContext";
import { useState, FunctionComponent } from "react";
import { EntryForm } from "./entryForm";

interface JournalEntryCardProps {
  myJournalEntry: JournalEntryType;
  handleNewJournalEntry: (myJournalEntry: JournalEntryType, isEditting: boolean) => void;
}

export const JournalEntryCard: FunctionComponent<JournalEntryCardProps> = ({
  myJournalEntry,
  handleNewJournalEntry,
}) => {
  const [isEditting, setIsEditting] = useState(false);
  //   const updateEntry = () => {};
  return (
    <div style={{ border: "1px solid black", margin: "5px" }}>
      <Card style={{ width: "18rem" }}>
        {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
        <Card.Body>
          <Card.Title>Card {myJournalEntry.id}</Card.Title>
          {!isEditting && (
            <>
              <Card.Text>{myJournalEntry.entry}</Card.Text>
              <Button onClick={() => setIsEditting(!isEditting)}>Edit</Button>
            </>
          )}
          {isEditting && (
            <EntryForm
              handleNewJournalEntry={handleNewJournalEntry}
              journalEntryToBeEditted={myJournalEntry}
              isEditting={isEditting}
              setIsEditting={setIsEditting}
            />
          )}
        </Card.Body>
      </Card>
    </div>
  );
};
