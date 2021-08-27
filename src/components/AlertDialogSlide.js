import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import Slide from "@material-ui/core/Slide";
import ClearIcon from "@material-ui/icons/Clear";
import IconButton from "@material-ui/core/IconButton";

import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { getUserDetails } from "../utils/utils";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
  root: {
    width: "600px",
    maxWidth: "100%",
    margin: "1rem 0",
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  avatar: {
    backgroundColor: "hsl(203, 89%, 53%)",
  },
}));

export default function AlertDialogSlide({
  openDetailUser,
  setOpenDetailUser,
  user_id,
}) {
  const [userDetails, setUserDetails] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    getUserDetails(user_id, setUserDetails);
    return () => {
      setUserDetails([]);
    };
  }, [user_id]);

  return (
    <div>
      <Dialog
        open={openDetailUser}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => setOpenDetailUser(false)}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogActions>
          <IconButton onClick={() => setOpenDetailUser(false)} color="primary">
            <ClearIcon />
          </IconButton>
        </DialogActions>
        <Card className={classes.root}>
          <CardHeader
            avatar={
              <Avatar aria-label="recipe" className={classes.avatar}>
                <img src={userDetails.profile_image_url_https} alt="images" />
              </Avatar>
            }
            title={`${userDetails.name} @${userDetails.screen_name}`}
            subheader={`joined ${userDetails.created_at}`}
          />
          <Typography
            variant="body2"
            color="textSecondary"
            component="p"
            style={{ padding: "0 1rem 1rem" }}
          >
            <strong>description : </strong>
            {userDetails.description}
          </Typography>
          {userDetails?.profile_banner_url && (
            <CardMedia
              className={classes.media}
              image={userDetails.profile_banner_url}
              // title="Paella dish"
            />
          )}
          <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
              <strong>location :</strong> {userDetails.location}
            </Typography>
          </CardContent>
        </Card>
      </Dialog>
    </div>
  );
}
