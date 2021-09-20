import React /*, { useState, useEffect }*/ from "react";
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
// import { getUserDetails } from "../utils/utils";
import { formatTimeAgo } from "../utils/utils";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
  root: {
    width: "600px",
    maxWidth: "100%",
  },
  avatar: {
    backgroundColor: "hsl(203, 89%, 53%)",
    height: "70px",
    width: "70px",
  },
}));

export default function AlertDialogSlide({
  openDetailUser,
  setOpenDetailUser,
  // user_id,
  userDetails,
}) {
  // const [userDetails, setUserDetails] = useState([]);
  const classes = useStyles();

  // useEffect(() => {
  //   getUserDetails(user_id, setUserDetails);
  //   return () => {
  //     setUserDetails([]);
  //   };
  // }, [user_id]);

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
                <img
                  src={userDetails.profile_image_url_https}
                  alt="images"
                  style={{
                    height: "100%",
                    width: "100%",
                    objectFit: "contain",
                  }}
                />
              </Avatar>
            }
            title={`${userDetails.name} @${userDetails.screen_name}`}
            subheader={`joined ${formatTimeAgo(
              Date.parse(userDetails.created_at)
            )}`}
          />
          {userDetails?.description && (
            <Typography
              variant="body2"
              component="p"
              style={{ padding: "0 1rem 1rem" }}
            >
              <strong>description : </strong>
              {userDetails.description}
            </Typography>
          )}
          {userDetails?.profile_banner_url && (
            <CardMedia
              component="img"
              height="100%"
              image={userDetails.profile_banner_url}
            />
          )}
          <CardContent>
            {userDetails?.location && (
              <Typography variant="body2" component="p">
                <strong>location :</strong> {userDetails.location}
              </Typography>
            )}
            {userDetails?.friends_count && (
              <Typography variant="body2" component="p">
                <strong>friends :</strong> {userDetails.friends_count}
              </Typography>
            )}
            {userDetails?.followers_count && (
              <Typography variant="body2" component="p">
                <strong>followers :</strong> {userDetails.followers_count}
              </Typography>
            )}
            {userDetails?.following && (
              <Typography variant="body2" component="p">
                <strong>following :</strong> {userDetails.following}
              </Typography>
            )}
            {userDetails?.favourites_count && (
              <Typography variant="body2" component="p">
                <strong>favourites :</strong> {userDetails.favourites_count}
              </Typography>
            )}
          </CardContent>
        </Card>
      </Dialog>
    </div>
  );
}
