import React, { useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { Container, Button, IconButton, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  cardContainer: {
    width: "600px",
    maxWidth: "100%",
  },
  typography: {
    fontWeight: "bold",
    width: "100%",
    fontSize: "clamp(3.5vh, 2.6vw, 15vw);",
    color: "black",
    textAlign: "center",
  },
  button: {
    padding: "5px 0",
    width: "7rem",
    fontWeight: "bold",
    backgroundColor: "hsl(203, 89%, 53%)",
    margin: "0.5rem 0.25rem",
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  avatar: {
    backgroundColor: "hsl(203, 89%, 53%)",
  },
  goBackButton: { marginRight: "auto" },
});

export default function TweetDetails() {
  const [tweetActive, setTweetActive] = useState(0);
  const history = useHistory();
  const location = useLocation();

  const searchResults = location.state.searchResults;

  const classes = useStyles();

  const handleOnClickButtonNext = () => {
    if (tweetActive < searchResults.length - 1)
      setTweetActive((prev) => prev + 1);
  };

  const handleOnClickButtonPrev = () => {
    if (tweetActive >= 1) setTweetActive((prev) => prev - 1);
  };

  return (
    <Container className={classes.root}>
      <IconButton
        onClick={() => history.goBack()}
        className={classes.goBackButton}
      >
        <ArrowBackIcon />
      </IconButton>
      {searchResults.slice(tweetActive, tweetActive + 1).map((item, index) => {
        return (
          <Card key={index} className={classes.cardContainer}>
            <CardHeader
              avatar={
                <Avatar aria-label="recipe" className={classes.avatar}>
                  {item.user.name[0].toUpperCase()}
                </Avatar>
              }
              title={item?.user.name}
              subheader={item?.publication_date}
            />
            <CardMedia
              className={classes.media}
              image="Twitter_cover.jpg"
              title="Paella dish"
            />
            <CardContent>
              <Typography variant="body2" color="textSecondary" component="p">
                <strong>{item?.description}</strong>
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {item?.detail}
              </Typography>
            </CardContent>
            <Container
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-between",
              }}
            >
              <Button
                className={classes.button}
                onClick={handleOnClickButtonPrev}
              >
                previous
              </Button>
              <Button
                className={classes.button}
                onClick={handleOnClickButtonNext}
              >
                next
              </Button>
            </Container>
          </Card>
        );
      })}
    </Container>
  );
}
