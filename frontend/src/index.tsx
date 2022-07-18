import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Auth0Provider } from "@auth0/auth0-react";
import { GlobalContext } from "./contexts/index";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev--94ogr3y.us.auth0.com"
      clientId="x4cffNV4PTw1LfwLgoLynoKPbDf0tl89"
      redirectUri={window.location.origin}
      audience="https://journal/api"
      scope="read:journalEntries"
    >
      <GlobalContext>
        <App />
      </GlobalContext>
    </Auth0Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
