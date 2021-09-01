import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { Container, IconButton, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import Pagination from "react-js-pagination";
import SkeletonCard from "../components/SkeletonCard";
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

const itemsCountPerPage = 10;

export default function SearchResults() {
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const [activePage, setActivePage] = useState(1);
  const [bounds, setBounds] = useState([0, itemsCountPerPage]);

  const classes = useStyles();
  const dispatch = useDispatch();

  const history = useHistory();
  const location = useLocation();

  const searchKeyword =
    sessionStorage.getItem("searchKeyword") || location.search.substr(3) || "";

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
    setBounds([
      (pageNumber - 1) * itemsCountPerPage,
      pageNumber * itemsCountPerPage,
    ]);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const SkeletonCards = [];
  for (var i = 0; i < itemsCountPerPage; i++) {
    SkeletonCards.push(<SkeletonCard />);
  }

  useEffect(() => {
    getSearchResults(searchKeyword, setSearchResults, setLoading);
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
      {loading && (
        <>
          {SkeletonCards.length !== 0 &&
            SkeletonCards.map((skeleton, index) => {
              return skeleton;
            })}
        </>
      )}
      {!loading && (
        <Typography>
          {searchResults?.length} results,{" "}
          {searchResults?.length / itemsCountPerPage} per page
        </Typography>
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
          itemsCountPerPage={itemsCountPerPage}
          totalItemsCount={searchResults.length}
          pageRangeDisplayed={itemsCountPerPage / 2}
          onChange={handlePageChange}
          itemClass="page-item"
          linkClass="page-link"
        />
      )}
    </Container>
  );
}
