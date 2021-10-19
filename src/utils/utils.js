import axios from "axios";

// const API_URL = "http://localhost:8000";
// const API_URL = "https://twitter-search-engine-back-ts.herokuapp.com";

export const getSearchResults = async (
  searchKeyword,
  setSearchResults,
  setLoading
) => {
  setLoading(true);
  await axios
    .get(`/search?q=${searchKeyword}`)
    .then((response) => {
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
    .get(`/users/${id}`)
    .then((response) => {
      setUserDetails(response.data);
    })
    .catch((error) => {
      console.log(`error`, error);
    });
};

const formatter = new Intl.RelativeTimeFormat(undefined, {
  numeric: "auto",
});

const DIVISIONS = [
  { amount: 60, name: "seconds" },
  { amount: 60, name: "minutes" },
  { amount: 24, name: "hours" },
  { amount: 7, name: "days" },
  { amount: 4.34524, name: "weeks" },
  { amount: 12, name: "months" },
  { amount: Number.POSITIVE_INFINITY, name: "years" },
];

export function formatTimeAgo(date) {
  let duration = (date - new Date()) / 1000;
  for (let i = 0; i < DIVISIONS.length; i++) {
    const division = DIVISIONS[i];
    if (Math.abs(duration) < division.amount) {
      return formatter.format(Math.round(duration), division.name);
    }
    duration /= division.amount;
  }
}
