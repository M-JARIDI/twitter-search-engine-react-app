import React, { useState, useEffect } from "react";
import { alpha, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

import SearchBar from "material-ui-search-bar";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
}));

export default function SearchAppBar() {
  const classes = useStyles();
  const [searchKeyword, setSearchKeyword] = useState("");

  // const searchKeyword = sessionStorage.getItem("searchKeyword");

  useEffect(() => {
    setSearchKeyword(sessionStorage.getItem("searchKeyword"));
  }, [searchKeyword]);

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          <div style={{ margin: "5px 10px" }}>
            <a href="/">
              <img src="twitter.png" width="40" height="40" alt="logo" />
            </a>
          </div>
          <Typography className={classes.title} variant="h6" noWrap>
            Twitter Search Engine
          </Typography>
          {searchKeyword && (
            <div className={classes.search}>
              <SearchBar
                value={searchKeyword}
                disabled={true}
                className={classes.searchBar}
              />
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
