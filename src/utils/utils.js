import axios from "axios";

// const API_URL = "http://localhost:8000";
const API_URL = "https://twitter-search-engine-back-js.herokuapp.com";

export const getSearchResults = async (
  searchKeyword,
  setSearchResults,
  setLoading
) => {
  setLoading(true);
  await axios
    .get(`${API_URL}/search?q=${searchKeyword}`)
    .then((response) => {
      console.log("search results", response.data.statuses[0].user);
      setSearchResults(response.data.statuses);
      setLoading(false);
    })
    .catch((error) => {
      console.log(`error`, error);
      setLoading(false);
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
