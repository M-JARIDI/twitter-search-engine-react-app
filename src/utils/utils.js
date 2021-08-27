import axios from "axios";

// const API_URL = "http://localhost:8000";
const API_URL = "https://twitter-search-engine-back-js.herokuapp.com";

export const getSearchResults = async (searchKeyword, setSearchResults) => {
  await axios
    .get(`${API_URL}/search?q=${searchKeyword}`)
    .then((response) => {
      console.log("response", response.data.statuses[0]);
      setSearchResults(response.data.statuses);
    })
    .catch((error) => {
      console.log(`error`, error);
    });
};

export const getUserDetails = async (id, setUserDetails) => {
  await axios
    .get(`${API_URL}/users/${id}`)
    .then((response) => {
      // console.log("user details", response.data);
      setUserDetails(response.data);
    })
    .catch((error) => {
      console.log(`error`, error);
    });
};
