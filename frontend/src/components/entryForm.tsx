import { useState, FunctionComponent, useEffect, useContext, MouseEvent } from "react";
import { postEntry } from "../utils/apiService";
import { useAuth0 } from "@auth0/auth0-react";
import { JournalEntryType } from "../App";

interface EntryFormProps {
  myJournalEntries: JournalEntryType[];
  setMyJournalEntries: (myJournalEntries: JournalEntryType[]) => void;
}

interface FormProps {
  entry: string;
  feelingState: string;
  emailHashed: string;
}

export const EntryForm: FunctionComponent<EntryFormProps> = ({
  myJournalEntries,
  setMyJournalEntries,
}) => {
  const { user, getAccessTokenSilently } = useAuth0();

  const genericToken = async () => {
    try {
      return await getAccessTokenSilently();
    } catch (error) {}
  };
  //newRestaurant state is only used in the frontend, thus actual value of idRestaurant does not matter here, and can be set to whatevah
  const emptyEntryForm = {
    entry: "",
    feelingState: "",
    emailHashed: "",
  };

  //newMenu state is only used in the frontend, thus actual value of idMenu/idRestaurant does not matter here, and can be set to whatevah
  //   const emptyNewMenuForm = { idMenu: 0, name: "", idRestaurant: 0 };
  //   const emptyNewMenuItemForm = { idMenuItem: 0, name: "", idMenu: 0, price: "" };

  const [newJournalEntry, setNewJournalEntry] = useState<FormProps>(emptyEntryForm);
  //   const [idRestaurantSelected, setIdRestaurantSelected] = useState<number>(0);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    // const result = await axios.post("http://localhost:8000/restaurants", { ...newRestaurant });
    const result = postEntry(await genericToken(), user?.email!, {
      ...newJournalEntry,
    });
    const newEntry = await result;
    setMyJournalEntries([...myJournalEntries, newEntry]);

    //adds the restaurant to our frontend and updates idRestaurant with its actual value from the database
    // addRestaurant({ ...newRestaurant, idRestaurant: result.data.insertId });
    // setNewRestaurant(emptyRestaurantForm);
  };

  const journalEntryFormFields = [
    { label: "Enter a journal entry: ", input: "entry" },
    { label: "How are you feeling (from 1 to 5): ", input: "feelingState" },
  ];

  return (
    <>
      {user && (
        <form onSubmit={handleSubmit}>
          <h2>Add a journal entry</h2>
          <div>
            {journalEntryFormFields.map((journalEntryFormField) => (
              <div key={journalEntryFormField.input}>
                <label>{journalEntryFormField.label}</label>
                <input
                  type="text"
                  value={newJournalEntry[journalEntryFormField.input as keyof FormProps]}
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
