import React, { useState } from 'react';
import { Box, Stack, Typography, Modal, Alert, Button, Divider } from "@mui/material";
import PageTitle from '../UI/PageTitle';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import UpdateForm from './UpdateForm';
import { getCookie } from 'cookies-next';

const style = {
  position: 'absolute',
  top: '30%',
  left: '50%',
  transform: 'translate(-30%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function Profile({ user }) {

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);  

  const userInfoUpdateHandler = (isUpdated) => {
      if(isUpdated) {
        // alert user that info is updated
      }

      else {
        // alert user that info is not updated
      }
  };

  const handleAccountDelete = () => {
    const token = getCookie("USER_AUTH_TOKEN");
    // send a delete request
  };

  return (
    <>
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description">
            <Box sx={style}>
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
            </Box>
        </Modal>
        <Stack sx={{ padding: { lg: "2rem", sm: "1rem", xs: "1rem", md: "1rem"}}}>
          <PageTitle title="Profile">
            <AccountCircleIcon sx={{ color: "#0F4AC7" }} />
        </PageTitle>
        <Box sx={{ background: "#fff", padding: "3rem", margin: "1rem 0", borderRadius: "1rem", display: "flex", 
        justifyContent: "center", alignItems: "center"}}>
            <Stack>
                <Typography variant="h5" component="h2" color="#9E9EA7">Edit profile</Typography>
                <UpdateForm onUserProfileUpdate={userInfoUpdateHandler} userInfo={user} />
            </Stack>
        </Box>
        <Box sx={{ background: "#fff", display: "flex", alignItems: "center",justifyContent: { lg: "space-between", sm: "center", md: "space-between", xs: "center"},flexDirection: { lg: "row", sm: "column", md: "row", xs: "column"}, padding: "1rem", borderRadius: "1rem"}}>
            <Typography color="#333"sx={{  margin: { lg: "0", md: "0", sm: "1rem 0", xs: "1rem 0"}}}>,
              <span style={{ color: "#1976D2"}}>Date Joined:</span> {user.dateJoined}
             </Typography>
            <Button variant="text" sx={{ color: "red", margin: { lg: "0", md: "0", sm: "1.3rem 0", xs: "1.3rem 0"}}} onClick={handleOpen}>Delete Account</Button>
        </Box>
        </Stack>
    </>
  )
}
