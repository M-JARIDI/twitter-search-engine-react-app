import React from "react";
import { Container, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    color: "black",
    fontWeight: "bold",
    fontSize: "2.5vh",
    textAlign: "center",
  },
  container: {
    marginTop: "4rem",
  },
});

export default function Footer() {
  const classes = useStyles();
  return (
    <Container className={classes.container}>
      <hr />
      <Typography className={classes.root}>
        <span>
          Open source by{" "}
          <a
            href="https://github.com/M-JARIDI"
            target="_blank"
            rel="noreferrer"
          >
            {" "}
            Mustapha Jaridi
          </a>
          <span> &copy; 2021</span>
        </span>
      </Typography>
    </Container>
  );
}
