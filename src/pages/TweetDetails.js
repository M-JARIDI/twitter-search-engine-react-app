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
import { formatTimeAgo } from "../utils/utils";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    minHeight: "75vh",
  },
  cardContainer: {
    width: "600px",
    maxWidth: "100%",
    backgroundColor: "hsl(0, 0%, 96%)",
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
  avatar: {
    backgroundColor: "hsl(203, 89%, 53%)",
  },
  goBackButton: { marginRight: "auto" },
});

export default function TweetDetails() {
  const location = useLocation();
  const searchResults = location.state.searchResults;
  const indexOfTweet = location.state.indexOfTweet;

  const [tweetActive, setTweetActive] = useState(indexOfTweet);

  const history = useHistory();

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
      <Typography style={{ marginBottom: "1rem" }}>{`${tweetActive + 1}/${
        searchResults.length
      }`}</Typography>
      {searchResults.slice(tweetActive, tweetActive + 1).map((item, index) => {
        return (
          <Card key={index} className={classes.cardContainer}>
            <CardHeader
              avatar={
                <Avatar aria-label="recipe" className={classes.avatar}>
                  <img src={item.user.profile_image_url_https} alt="images" />
                </Avatar>
              }
              title={`${item.user.name} @${item.user.screen_name}`}
              subheader={formatTimeAgo(Date.parse(item.created_at))}
            />
            {item.extended_entities?.media[0]?.media_url_https && (
              <CardMedia
                component="img"
                height="100%"
                image={item.extended_entities.media[0].media_url_https}
              />
            )}
            <CardContent>
              <Typography variant="body2" component="p">
                {item.text}
              </Typography>
              <hr />
              {item?.retweeted_status && (
                <Typography variant="body2" component="p">
                  <strong>retweeted status : </strong>
                  <br />
                  {item.retweeted_status?.text}
                </Typography>
              )}
              {item?.entities?.user_mentions.length !== 0 && (
                <Typography variant="body2" component="p">
                  <strong>user mentions : </strong>
                  {item?.entities?.user_mentions?.map((mention) => {
                    return `@${mention.screen_name}, `;
                  })}
                </Typography>
              )}
              {item?.entities?.hashtags?.length !== 0 && (
                <Typography variant="body2" component="p">
                  <strong>user hashtags : </strong>
                  {item.entities.hashtags.map((hash) => {
                    return `#${hash.text}, `;
                  })}
                </Typography>
              )}
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
