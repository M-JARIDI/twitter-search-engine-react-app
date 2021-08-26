import axios from "axios";

// const API_URL = "http://localhost:8000";
const API_URL = "https://twitter-search-engine-backend.herokuapp.com";

export const getSearchResults = async (searchKeyword, setSearchResults) => {
  await axios
    .get(`${API_URL}/search?q=${searchKeyword}`)
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
