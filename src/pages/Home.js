import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Container, Button, Typography } from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import { makeStyles } from "@material-ui/core/styles";

import SearchBar from "material-ui-search-bar";

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
    backgroundColor: "hsl(203, 89%, 53%)",
    // backgroundColor: "#1DA1F2",
    margin: "0.5rem 0.25rem",
  },
});

export default function Home() {
  const [searchKeyword, setSearchKeyword] = useState("");

  const classes = useStyles();

  const handleOnClickButton = () => {
    sessionStorage.setItem("searchKeyword", searchKeyword);
    window.open(`/search?q=${searchKeyword}`, "_blank")?.focus();
  };

  return (
    <Container className={classes.root}>
      <Typography className={classes.typography}>
        Twitter Search Engine
      </Typography>
      <Container className={classes.inputContainer}>
        <SearchBar
          value={searchKeyword}
          placeholder="Search here"
          onChange={(newValue) => setSearchKeyword(newValue)}
          onRequestSearch={() => handleOnClickButton()}
          onCancelSearch={() => setSearchKeyword("")}
          className={classes.searchBar}
        />
        <Link
          to={{
            pathname: "/search",
            search: `q=${searchKeyword}`,
          }}
          target="_blank"
          style={{ textDecoration: "none" }}
        >
          <Button
            variant="contained"
            color="primary"
            endIcon={<SendIcon></SendIcon>}
            onClick={() => handleOnClickButton()}
            className={classes.button}
          >
            Search
          </Button>
        </Link>
      </Container>
    </Container>
  );
}
