import React, { useState } from 'react';
import { Box, Stack, Typography, Modal, Alert, Button, Divider } from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import Toast from '../UI/Toast/Toast';
import PageTitle from '../UI/PageTitle/PageTitle';
import UpdateForm from './UpdateForm';

import ModalContent from '../UI/Modal/ModalContent';

import { getCookie, deleteCookie } from 'cookies-next';

export default function Profile({ user, onUserAccountDelete }) {

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);  
  const [requestIsCompleted, setRequestIsCompleted] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");
  const [snackBarType, setSnackBarType] = useState("");

  const userInfoUpdateHandler = (isUpdated) => {
      setRequestIsCompleted(true);

      if(isUpdated) {
        // alert user that info is updated
        setSnackMessage("profile info updated 😊");
        setSnackBarType("success");
      }

      else {
        // alert user that info is not updated
        setSnackMessage("oops! something went wrong 😊");
        setSnackBarType("error");
      }
  };

  const handleAccountDelete = async () => {
    const token = getCookie("USER_AUTH_TOKEN");
    // send a delete request
    await fetch("https://localhost:7136/api/applicationuser/delete", {
      mode: 'cors',
      method: "DELETE",
      withCredentials: true,
      credentials: 'same-origin',
      headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': '*',
          'Access-Control-Allow-Methods': '*',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
      }
    })
    .then(response => response.json())
    .then(responseJson => {
        const { status } = responseJson;
        console.log(responseJson);
        if(status == 200) {
            handleClose();
            // user deleted alert
            // delete cookies and logout 
            onUserAccountDelete();
        }
    })
    .catch(error => {
        alert(error);
    });
  };

  return (
    <>
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description">
            <ModalContent height="250px">
                <Typography id="modal-modal-title" variant="h6" component="h2">Delete Account</Typography>
                <Divider />
                <Alert severity="warning" sx={{margin: "1rem 0"}}>Warning: all task related to this account will be deleted</Alert>
                <Typography id="modal-modal-description" sx={{ mt: 2, color: "red" }}>
                    Are you sure you want to delete this account ?
                </Typography>
                <Box sx={{ margin: "1rem 0"}}>
                  <Button variant="contained" onClick={handleAccountDelete}>Yes</Button>
                  <Button onClick={handleClose}>No</Button>
                </Box>
            </ModalContent>
        </Modal>
        <Stack sx={{ padding: { lg: "2rem", sm: "1rem", xs: "1rem", md: "1rem"}}}>
          <PageTitle title="Profile">
            <AccountCircleIcon sx={{ color: "#0F4AC7" }} />
        </PageTitle>
        <Box sx={{ background: "#fff", padding: "2rem 0", margin: "1rem 0", borderRadius: ".5rem", display: "flex", 
        justifyContent: "center", alignItems: "center"}}>
            <Stack width="100%">
                <AccountCircleIcon sx={{ alignSelf: "center", color: "#C9C9C9", fontSize: "8rem", margin: ".3rem 0" }} />
                <UpdateForm onUserProfileUpdate={userInfoUpdateHandler} userInfo={user} />
            </Stack>
        </Box>
        <Box sx={{ background: "#fff", display: "flex", alignItems: "center",justifyContent: { lg: "space-between", sm: "center", md: "space-between", xs: "center"},flexDirection: { lg: "row", sm: "column", md: "row", xs: "column"}, padding: "1rem", borderRadius: "1rem"}}>
            <Typography color="#333"sx={{  margin: { lg: "0", md: "0", sm: "1rem 0", xs: "1rem 0"}}}>
              <span style={{ color: "#1976D2"}}>Joined:</span> {user.dateJoined}
             </Typography>
            <Button variant="text" sx={{ color: "red", margin: { lg: "0", md: "0", sm: "1.3rem 0", xs: "1.3rem 0"}}} onClick={handleOpen}>Delete Account</Button>
        </Box>
        {requestIsCompleted && <Toast snackBarType={snackBarType} snackMessage={snackMessage} /> }
        </Stack>
    </>
  )
}
