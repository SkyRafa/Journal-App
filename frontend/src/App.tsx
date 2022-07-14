import React, { useEffect, useState } from "react";

import "./App.css";
import LoginButton from "./components/LoginButton";
import LogoutButton from "./components/LogoutButton";
import Profile from "./components/Profile";
import { getEntries } from "./utils/apiService";
import { useAuth0 } from "@auth0/auth0-react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";

export interface JournalEntryType {
  id: number;
  entry: string;
  feelingState: number;
  emailHashed: string;
  createdAt: Date;
  updatedAt: Date;
}

const App = () => {
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
    <div className="App">
      <header className="App-header">
        <LoginButton />
        <LogoutButton />
        <Profile />
      </header>
      <Router>
        {/* <NavBar /> */}
        <div className="App">
          <Routes>
            {/* <Route path="/about" element={<About />} /> */}
            <Route
              path="/"
              element={
                <Home
                  myJournalEntries={myJournalEntries}
                  setMyJournalEntries={setMyJournalEntries}
                />
              }
            />
          </Routes>
        </div>
      </Router>
    </div>
  );
};

export default App;
