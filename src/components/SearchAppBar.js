import React, { useState, useEffect } from "react";
import { alpha, makeStyles, createTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

import { Switch, ThemeProvider, CssBaseline } from "@material-ui/core";

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
  rightToolbar: {
    marginLeft: "auto",
    marginRight: 10,
  },
}));

export default function SearchAppBar() {
  const [darkMode, setDarkMode] = useState(false);

  const classes = useStyles();
  const theme = createTheme({
    palette: {
      type: darkMode ? "dark" : "light",
    },
  });

  const searchKeyword = sessionStorage.getItem("searchKeyword");

  return (
    <div className={classes.grow}>
      <AppBar
        position="static"
        style={{ backgroundColor: "hsl(203, 89%, 43%)" }}
      >
        <Toolbar>
          <div style={{ margin: "5px 10px" }}>
            <a href="/" onClick={() => sessionStorage.clear()}>
              <img
                src="twitterr.png"
                width="40"
                height="40"
                alt="logo"
                style={{ boxShadow: "0px 5px 2px black" }}
              />
            </a>
          </div>
          <Typography className={classes.title} variant="h6" noWrap>
            Twitter Search Engine
          </Typography>
          {searchKeyword && (
            <div className={classes.search}>
              <SearchBar value={searchKeyword} disabled={true} />
            </div>
          )}
          <section className={classes.rightToolbar}></section>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <i>
              <Typography variant="h6">
                {darkMode ? "Light Mode" : "Dark Mode"}
              </Typography>
            </i>
            <Switch
              checked={darkMode}
              onChange={() => setDarkMode(!darkMode)}
            />
          </ThemeProvider>
        </Toolbar>
      </AppBar>
    </div>
  );
}
