import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Container, Button, Typography } from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import { makeStyles } from "@material-ui/core/styles";

import SearchInput from "material-ui-search-bar";

const useStyles = makeStyles({
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
});

export default function Home() {
  const [searchKeyword, setSearchKeyword] = useState("");

  const classes = useStyles();

  const handleOnClickButton = () => {
    sessionStorage.setItem("searchKeyword", searchKeyword);
    window.open(`/search?q=${searchKeyword}`, "_blank")?.focus();
    sessionStorage.clear();
  };

  return (
    <Container className={classes.root}>
      <Typography className={classes.typography}>
        Twitter Search Engine
      </Typography>
      <Container className={classes.inputContainer}>
        <SearchInput
          value={searchKeyword}
          placeholder="Search here"
          onChange={(newValue) => setSearchKeyword(newValue)}
          onRequestSearch={() => handleOnClickButton()}
          onCancelSearch={() => setSearchKeyword("")}
          className={classes.SearchInput}
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
