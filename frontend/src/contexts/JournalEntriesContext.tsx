import { createContext, FunctionComponent, useState, useEffect } from "react";
import { getEntries } from "../utils/apiService";
import { useAuth0 } from "@auth0/auth0-react";

export interface JournalEntryType {
  id?: number;
  entry: string;
  feelingState?: number;
  emailHashed: string;
  createdAt: any;
  updatedAt: any;
}

type JournalEntriesContextProvider = {
  children: React.ReactNode;
};

type JournalEntriesContextProps = {
  myJournalEntries: JournalEntryType[];
  setMyJournalEntries: (myJournalEntries: JournalEntryType[]) => void;
};

const DEFAULT_VALUE = {
  myJournalEntries: [],
  setMyJournalEntries: () => {},
};

export const JournalEntriesContext = createContext<JournalEntriesContextProps>(DEFAULT_VALUE);

export const JournalEntriesContextProvider: FunctionComponent<JournalEntriesContextProvider> = ({
  children,
}) => {
  const [myJournalEntries, setMyJournalEntries] = useState<JournalEntryType[]>([]);
  const { user, getAccessTokenSilently } = useAuth0();
  const genericToken = async () => {
    try {
      return await getAccessTokenSilently();
    } catch (error) {}
  };
  const getMyEntries = async () => {
    const myEntriesArray = await getEntries(await genericToken(), `${user?.email}`);
    setMyJournalEntries(myEntriesArray);
  };
  useEffect(() => {
    user?.email && getMyEntries();
  }, [user]);

  return (
    <JournalEntriesContext.Provider value={{ myJournalEntries, setMyJournalEntries }}>
      {children}
    </JournalEntriesContext.Provider>
  );
};
