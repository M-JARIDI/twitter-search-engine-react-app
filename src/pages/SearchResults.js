import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Container, Button } from "@material-ui/core";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { makeStyles } from "@material-ui/core/styles";

import {
  subscribeSearchKeyword,
  unSubscribeSearchKeyword,
} from "../redux/slices/searchSlice";

import SearchInput from "material-ui-search-bar";
import TweeTCard from "../components/TweeTCard";

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
  },
  inputContainer: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
  },
  SearchInput: {
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
  const [searchResults, setSearchResults] = useState([]);
  const classes = useStyles();
  const dispatch = useDispatch();

  const history = useHistory();

  const searchKeyword = sessionStorage.getItem("searchKeyword");

  useEffect(() => {
    getSearchResults(setSearchResults);
    return () => {
      sessionStorage.clear();
      setSearchResults([]);
      dispatch(subscribeSearchKeyword());
    };
  }, [dispatch]);

  useEffect(() => {}, [searchResults]);

  return (
    <Container className={classes.root}>
      {searchResults?.map((item, index) => {
        return <TweeTCard key={index} item={item} />;
      })}
      <Container className={classes.inputContainer}>
        <SearchInput
          value={searchKeyword}
          disabled={true}
          className={classes.SearchInput}
        />
        <Button
          variant="contained"
          color="primary"
          startIcon={<ArrowBackIosIcon />}
          onClick={() => {
            history.replace("/");
            sessionStorage.clear();
            window.location.reload();
            dispatch(unSubscribeSearchKeyword());
          }}
          className={classes.button}
        >
          Back to home
        </Button>
      </Container>
    </Container>
  );
}
