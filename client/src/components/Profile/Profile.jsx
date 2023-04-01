import React from 'react';
import { Box, Stack, Typography, Grid } from "@mui/material";
import PageTitle from '../UI/PageTitle';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export default function Profile() {
  return (
    <Stack sx={{ padding: { lg: "2rem", sm: "1rem", xs: "1rem", md: "1rem"}}}>
          <PageTitle title="Profile">
            <AccountCircleIcon sx={{ color: "#0F4AC7" }} />
        </PageTitle>
    </Stack>
  )
}
