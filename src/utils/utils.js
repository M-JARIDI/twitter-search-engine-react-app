import axios from "axios";

const API_URL = "http://localhost:8000";

export const getSearchResults = async () => {
  await axios
    .get(`${API_URL}/search`)
    .then((response) => {
      console.log("search data", response.data);
    })
    .catch((error) => {
      console.log(`error`, error);
    });
};

export const getUserDetails = async (id) => {
  await axios
    .get(`${API_URL}/users/${id}`)
    .then((response) => {
      console.log("user data ", response.data);
    })
    .catch((error) => {
      console.log(`error`, error);
    });
};
