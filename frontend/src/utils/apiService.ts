import axios from "axios";
import { JournalEntryType } from "../App";

const apiOrigin = "http://localhost:8000";

export const callApi = async (route: string, methodUsed: string, dataUsed: any, token: string) => {
  try {
    const axiosInit: object = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      url: `${apiOrigin}${route}`,
      method: methodUsed,
      data: dataUsed,
    };
    const response = await axios(axiosInit);
    return response;
  } catch (error) {
    throw error;
  }
};

export const getEntries = async (token: any, email: string) => {
  try {
    const response = await callApi(`/journalEntries/?email=${email}`, "get", null, token);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const postEntry = async (token: any, body: JournalEntryType) => {
  try {
    const response = await callApi(`/journalEntries`, "post", body, token);
    response.data.feelingState = parseInt(response.data.feelingState);
    console.log("22222", response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const editEntry = async (token: any, body: JournalEntryType) => {
  try {
    const response = await callApi(`/journalEntries/?id=${body.id}`, "put", body, token);
    console.log("response", response);
    return response.data;
  } catch (error) {
    throw error;
  }
};
