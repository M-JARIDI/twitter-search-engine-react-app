import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import PersonIcon from "@material-ui/icons/Person";
import AlertDialogSlide from "./AlertDialogSlide";

import { formatTimeAgo } from "../utils/utils";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "600px",
    maxWidth: "100%",
    margin: "1rem 0",
    backgroundColor: "hsl(0, 0%, 96%)",
  },
  avatar: {
    backgroundColor: "hsl(203, 89%, 53%)",
  },
}));

export default function TweeTCard({ searchResults, item, indexOfTweet }) {
  const classes = useStyles();
  const history = useHistory();
  const [openDetailUser, setOpenDetailUser] = useState(false);

  const handleDetailClick = () => {
    history.push({
      pathname: "/tweet_details",
      state: { searchResults, indexOfTweet },
    });
  };

  return (
    <>
      <Card className={classes.root}>
        <CardHeader
          onClick={() => setOpenDetailUser(true)}
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar}>
              <img src={item.user.profile_image_url_https} alt="images" />
            </Avatar>
          }
          action={
            <IconButton onClick={() => setOpenDetailUser(true)}>
              <PersonIcon fontSize="large" style={{ paddingTop: "10px" }} />
            </IconButton>
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
        </CardContent>
        <CardActions disableSpacing>
          <Button size="small" variant="contained" onClick={handleDetailClick}>
            <strong>More details</strong>
          </Button>
        </CardActions>
      </Card>
      <AlertDialogSlide
        openDetailUser={openDetailUser}
        setOpenDetailUser={setOpenDetailUser}
        // user_id={item.user.id}
        userDetails={item.user}
      />
    </>
  );
}
