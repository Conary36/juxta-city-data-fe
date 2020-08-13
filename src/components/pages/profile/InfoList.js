import React from "react";
import profileInfoStyle from "../profileStyles/profileInfoStyle";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import { deleteProfile } from "../../../functions";
import Avatar from "@material-ui/core/Avatar";
import ImageUpload from "./ImageUpload";
import profiledefault from "../../../assets/default.png"
const InfoList = ({ info, toggleEditing }) => {
  const classes = profileInfoStyle();

  const deleteUserProfile = () => {
    deleteProfile(info.id).then(() => window.location.reload());
  };
  const dateOfBirthOld = new Date(info.dob)
  
  
  const dateNew = dateOfBirthOld.getDate()
  const monthNew = dateOfBirthOld.getMonth()
  const yearNew = dateOfBirthOld.getFullYear()
  const dateOfBirthNew = (monthNew+1) + "/" + dateNew + "/" +yearNew;

  return (
    <Paper className={classes.paper} key={info.id}>
      <h2> {info.username}'s profile </h2>
      <List className={classes.root}>
        <ListItem>
          <img   src={
                !((info.image_url === "null") | (info.image_url === null))
                  ? info.image_url
                  : profiledefault
              } alt="" className={classes.large} />
        </ListItem>
        <ListItem>
          <ImageUpload info={info} />
        </ListItem>
        {info.first_name ? (
          <ListItem>
            <ListItemText primary="First Name" secondary={info.first_name} />
          </ListItem>
        ) : null}

        {info.last_name ? (
          <ListItem>
            <ListItemText primary="Last Name" secondary={info.last_name} />
          </ListItem>
        ) : null}

        <ListItem>
          <ListItemText primary="Email" secondary={info.email} />
        </ListItem>
        <ListItem>
          <ListItemText primary="Username" secondary={info.username} />
        </ListItem>

        {info.dob ? (
          <ListItem>
            <ListItemText primary="Date of Birth" secondary={dateOfBirthNew} />
          </ListItem>
        ) : null}

        <ListItem>
          <ListItemText primary="Address" secondary={info.address} />
        </ListItem>
        <ListItem>
          <ListItemText secondary={info.city} />
          <ListItemText secondary={info.state} />
          <ListItemText secondary={info.zip} />
        </ListItem>
      </List>
      <Button
        type="submit"
        variant="outlined"
        color="primary"
        className={classes.button}
        onClick={() => toggleEditing()}
      >
        Go to Edit profile
      </Button>
      <Button
        type="submit"
        variant="outlined"
        color="primary"
        className={classes.button}
        onClick={() => deleteUserProfile()}
      >
        Delete User
      </Button>
    </Paper>
  );
};
export default InfoList;
