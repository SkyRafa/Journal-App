import { useState, FunctionComponent, useContext } from "react";
import { postEntry, editEntry } from "../utils/apiService";
import { useAuth0 } from "@auth0/auth0-react";
import { JournalEntryType, JournalEntriesContext } from "../contexts/JournalEntriesContext";

interface EntryFormProps {
  handleNewJournalEntry: (newJournalEntry: JournalEntryType, isEditting: boolean) => void;
  journalEntryToBeEditted?: JournalEntryType;
  isEditting?: boolean;
  setIsEditting?: (isEditting: boolean) => void;
}

const emptyEntryForm = {
  id: 0,
  entry: "",
  feelingState: 0,
  emailHashed: "",
  createdAt: "",
  updatedAt: "",
};

export const EntryForm: FunctionComponent<EntryFormProps> = ({
  handleNewJournalEntry,
  journalEntryToBeEditted = emptyEntryForm,
  isEditting = false,
  setIsEditting,
}) => {
  const { user = {}, getAccessTokenSilently } = useAuth0();
  const { myJournalEntries, setMyJournalEntries } = useContext(JournalEntriesContext);

  const genericToken = async () => {
    try {
      return await getAccessTokenSilently();
    } catch (error) {}
  };

  //newMenu state is only used in the frontend, thus actual value of idMenu/idRestaurant does not matter here, and can be set to whatevah
  //   const emptyNewMenuForm = { idMenu: 0, name: "", idRestaurant: 0 };
  //   const emptyNewMenuItemForm = { idMenuItem: 0, name: "", idMenu: 0, price: "" };

  const [newJournalEntry, setNewJournalEntry] = useState<JournalEntryType>(
    isEditting ? journalEntryToBeEditted! : emptyEntryForm
  );
  //   const [idRestaurantSelected, setIdRestaurantSelected] = useState<number>(0);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    let result;
    if (!isEditting) {
      const newJournalEntryWithEmail = { ...newJournalEntry, emailHashed: user.email || "" };
      setNewJournalEntry(newJournalEntryWithEmail);
      result = await postEntry(await genericToken(), newJournalEntry);
      setNewJournalEntry(emptyEntryForm);
    } else {
      result = await editEntry(await genericToken(), newJournalEntry);
      const index = myJournalEntries.findIndex((entry) => entry.id === newJournalEntry.id);
      const entriesArray = [...myJournalEntries];
      entriesArray[index] = newJournalEntry;
      setMyJournalEntries(entriesArray);
    }
    handleNewJournalEntry(result, isEditting);
    setIsEditting!(false);
  };

  const journalEntryFormFields = [
    { label: "Enter a journal entry: ", input: "entry" },
    { label: "How are you feeling (from 1 to 5): ", input: "feelingState" },
  ];

  return (
    <>
      {user && (
        <form onSubmit={handleSubmit}>
          {!isEditting && <h2>Add a journal entry</h2>}
          <div>
            {journalEntryFormFields.map((journalEntryFormField) => (
              <div key={journalEntryFormField.input}>
                <label>{journalEntryFormField.label}</label>
                <input
                  type="text"
                  value={newJournalEntry[journalEntryFormField.input as keyof JournalEntryType]}
                  onChange={(e) =>
                    setNewJournalEntry({
                      ...newJournalEntry,
                      [journalEntryFormField.input]: e.target.value,
                    })
                  }
                  required
                ></input>
              </div>
            ))}
          </div>
          <input className="submit-button" type="submit" />
        </form>
      )}
    </>
  );
};
