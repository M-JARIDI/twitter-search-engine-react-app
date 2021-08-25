import React, { useEffect, useState } from "react";
import { useLocation, useHistory, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { searchState } from "../redux/slices/searchSlice";
import { Container, Button, Typography } from "@material-ui/core";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { makeStyles } from "@material-ui/core/styles";

import SearchBar from "material-ui-search-bar";
import { unSubscribeSearchQuery } from "../redux/slices/searchSlice";

import { getSearchResults } from "../utils/utils";

const useStyles = makeStyles({
  root: {
    minHeight: "80vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    // border: "7px solid red",
  },
  typography: {
    fontWeight: "bold",
    width: "100%",
    fontSize: "clamp(3.5vh, 2.6vw, 15vw);",
    color: "black",
    textAlign: "center",
    // border: "7px solid red",
  },
  inputContainer: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    // border: "4px solid green",
  },
  searchBar: {
    width: "30rem",
    margin: "0.5rem 0.25rem",
  },
  button: {
    padding: "11px 15px",
    fontWeight: "bold",
    backgroundColor: "#1DA1F2",
    margin: "0.5rem 0.25rem",
  },
});

export default function SearchResults() {
  const classes = useStyles();
  // const [loadingSearch, setLoadingSearch] = useState(false);
  const searchQuery = useSelector(searchState);

  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  //to get the value of the search after ?q=...
  const searchKeyword = sessionStorage.getItem("searchKeyword");

  useEffect(() => {
    getSearchResults();
  }, []);

  return (
    <Container className={classes.root}>
      <Typography className={classes.typography}>
        Twitter Search Engine
      </Typography>
      <Container className={classes.inputContainer}>
        <SearchBar
          value={searchKeyword}
          disabled={true}
          className={classes.searchBar}
        />
        <Button
          variant="contained"
          color="primary"
          startIcon={<ArrowBackIosIcon />}
          onClick={() => {
            history.replace("/");
            sessionStorage.clear();
          }}
          className={classes.button}
        >
          Back to home
        </Button>
      </Container>
    </Container>
  );
}
