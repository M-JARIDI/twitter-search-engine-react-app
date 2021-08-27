import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { Container, IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
// import Pagination from "@material-ui/lab/Pagination";
import {
  subscribeSearchKeyword,
  unSubscribeSearchKeyword,
} from "../redux/slices/searchSlice";
import TweeTCard from "../components/TweeTCard";
import { getSearchResults } from "../utils/utils";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "80vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
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
    backgroundColor: "hsl(203, 89%, 53%)",
    margin: "0.5rem 0.25rem",
  },
  goBackButton: { marginRight: "auto" },
  pagination: {
    display: "flex",
    justifyContent: "center",
  },
}));

export default function SearchResults() {
  const [searchResults, setSearchResults] = useState([]);

  // const [page, setPage] = useState(1);

  const classes = useStyles();
  const dispatch = useDispatch();

  const history = useHistory();
  const location = useLocation();

  const searchKeyword =
    sessionStorage.getItem("searchKeyword") || location.search.substr(3) || "";

  // const handleChangePage = (event, value) => {
  //   setPage(value);
  // };

  useEffect(() => {
    getSearchResults(searchKeyword, setSearchResults);
    return () => {
      sessionStorage.clear();
      setSearchResults([]);
      dispatch(unSubscribeSearchKeyword());
    };
  }, [searchKeyword, dispatch]);

  useEffect(() => {
    dispatch(subscribeSearchKeyword(searchResults));
  }, [searchResults, dispatch]);

  return (
    <Container className={classes.root}>
      <IconButton
        onClick={() => {
          history.replace("/");
          sessionStorage.clear();
          window.location.reload();
          dispatch(unSubscribeSearchKeyword());
        }}
        className={classes.goBackButton}
      >
        <ArrowBackIcon />
      </IconButton>
      {searchResults?.map((item, index) => {
        /*.slice(page - 1, page)*/
        return <TweeTCard key={index} item={item} />;
      })}
      {/* <Pagination
        count={searchResults.length}
        page={page}
        onChange={handleChangePage}
        showFirstButton
        showLastButton
        size="large"
        className={classes.pagination}
      /> */}
    </Container>
  );
}
