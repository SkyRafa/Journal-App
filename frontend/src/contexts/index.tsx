import { JournalEntriesContextProvider } from "./JournalEntriesContext";
import React, { FunctionComponent } from "react";

interface GlobalContextProps {
  children: React.ReactNode;
}

export const GlobalContext: FunctionComponent<GlobalContextProps> = ({ children }) => {
  return <JournalEntriesContextProvider>{children}</JournalEntriesContextProvider>;
};
