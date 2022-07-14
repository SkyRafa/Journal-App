import axios from "axios";

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

export const postEntry = async (token: any, email: string, body: object) => {
  try {
    const response = await callApi(`/journalEntries`, "post", body, token);
    response.data.feelingState = parseInt(response.data.feelingState);
    return response.data;
  } catch (error) {
    throw error;
  }
};
