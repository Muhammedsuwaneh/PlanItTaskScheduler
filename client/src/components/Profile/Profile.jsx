import React from 'react';
import { Box, Stack, Typography } from "@mui/material";
import PageTitle from '../UI/PageTitle';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import UpdateForm from './UpdateForm';

export default function Profile({ user }) {

  const userInfoUpdateHandler = (response) => {

  };
  console.log(user)

  return (
    <Stack sx={{ padding: { lg: "2rem", sm: "1rem", xs: "1rem", md: "1rem"}}}>
          <PageTitle title="Profile">
            <AccountCircleIcon sx={{ color: "#0F4AC7" }} />
        </PageTitle>
        <Box sx={{ display: "flex", flexDirection: { lg: "row", sm: "column", xs: "column", md: "column" }, 
        background: "#fff", padding: "2rem", margin: "1rem 0", borderRadius: "1rem", justifyContent: "space-around" }}>
              <Stack sx={{ borderRight: "1px solid #EDEFF1", flex: "2"}}>
              <Typography variant="h5" component="h2" color="#9E9EA7">Edit profile</Typography>
                  <UpdateForm onUserProfileUpdate={userInfoUpdateHandler} userInfo={user} />
              </Stack>
              <Stack sx={{ flex: "2"}}>
              </Stack>
        </Box>
    </Stack>
  )
}
