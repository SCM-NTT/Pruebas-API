import { type Configuration, LogLevel } from "@azure/msal-browser";

const OAUTHCLIENT = import.meta.env.VITE_OAUTHCLIENT;
const TENANT = import.meta.env.VITE_AUTORITY ;
const REDIRECT_URI = import.meta.env.VITE_REDIRECT_URI || "http://localhost:3000/";
export const msalConfig: Configuration = {
  auth: {
    clientId: OAUTHCLIENT,
    authority: TENANT,
    redirectUri: REDIRECT_URI,
  },
  cache: {
    cacheLocation: "localStorage",
    storeAuthStateInCookie: false,
  },
  system: {
    loggerOptions: {
      loggerCallback(level, message) {
        if (level <= LogLevel.Info) console.log(message);
      },
    },
  },
};

export const loginRequest = {
  scopes: [
    "User.Read",
    //"api://CLIENT_ID_BACKEND/user_impersonation"
  ],
};
