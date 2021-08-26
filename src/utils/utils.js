import axios from "axios";

const API_URL = "http://localhost:8000";

export const getSearchResults = async (setSearchResults) => {
  await axios
    .get(`${API_URL}/search`)
    .then((response) => {
      setSearchResults(response.data);
    })
    .catch((error) => {
      console.log(`error`, error);
    });
};

export const getUserDetails = async (id, setUserDetails) => {
  await axios
    .get(`${API_URL}/users/${id}`)
    .then((response) => {
      setUserDetails(response.data);
    })
    .catch((error) => {
      console.log(`error`, error);
    });
};
