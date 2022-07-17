import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { JournalEntryType } from "../App";
import { useState, FunctionComponent } from "react";
import { EntryForm } from "./entryForm";

interface JournalEntryCardProps {
  myJournalEntry: JournalEntryType;
  handleNewJournalEntry: (myJournalEntry: JournalEntryType) => void;
}

export const JournalEntryCard: FunctionComponent<JournalEntryCardProps> = ({
  myJournalEntry,
  handleNewJournalEntry,
}) => {
  const [isEditting, setIsEditting] = useState(false);
  //   const updateEntry = () => {};
  return (
    <div>
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
            <>
              <>{console.log("hehehe", myJournalEntry)}</>
              <EntryForm
                handleNewJournalEntry={handleNewJournalEntry}
                journalEntryToBeEditted={myJournalEntry}
                isEditting={isEditting}
              />
            </>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};
