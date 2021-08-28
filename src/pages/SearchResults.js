import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { Container, IconButton, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import CircularProgress from "@material-ui/core/CircularProgress";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import Pagination from "react-js-pagination";
import {
  subscribeSearchKeyword,
  unSubscribeSearchKeyword,
} from "../redux/slices/searchSlice";
import TweeTCard from "../components/TweeTCard";
import { getSearchResults } from "../utils/utils";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "75vh",
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
  scrollToTop: { marginLeft: "auto" },
}));

const ItemsCountPerPage = 10;

export default function SearchResults() {
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const [activePage, setActivePage] = useState(1);
  const [bounds, setBounds] = useState([0, ItemsCountPerPage]);

  const classes = useStyles();
  const dispatch = useDispatch();

  const history = useHistory();
  const location = useLocation();

  const searchKeyword =
    sessionStorage.getItem("searchKeyword") || location.search.substr(3) || "";

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
    setBounds([
      (pageNumber - 1) * ItemsCountPerPage,
      pageNumber * ItemsCountPerPage,
    ]);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    getSearchResults(searchKeyword, setSearchResults, setLoading);
    return () => {
      setSearchResults([]);
      dispatch(unSubscribeSearchKeyword());
    };
  }, [searchKeyword, dispatch]);

  useEffect(() => {
    dispatch(subscribeSearchKeyword(searchResults));
  }, [searchResults, dispatch]);

  return (
    <Container className={classes.root}>
      {loading && <CircularProgress />}
      {!loading && (
        <>
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
          <Typography>
            {searchResults?.length} results,{" "}
            {searchResults?.length / ItemsCountPerPage} per page
          </Typography>
        </>
      )}
      {searchResults?.slice(bounds[0], bounds[1]).map((item, index) => {
        return <TweeTCard key={index} item={item} indexOfTweet={index} />;
      })}
      {!loading && searchResults.length !== 0 && (
        <IconButton
          onClick={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className={classes.scrollToTop}
        >
          <ArrowUpwardIcon />
        </IconButton>
      )}
      {!loading && searchResults.length !== 0 && (
        <Pagination
          activePage={activePage}
          itemsCountPerPage={ItemsCountPerPage}
          totalItemsCount={searchResults.length}
          pageRangeDisplayed={ItemsCountPerPage}
          onChange={handlePageChange}
          itemClass="page-item"
          linkClass="page-link"
        />
      )}
    </Container>
  );
}
