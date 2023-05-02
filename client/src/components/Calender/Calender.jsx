import React from 'react';
import { Box, Stack, Typography, Grid } from "@mui/material";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PageTitle from '../UI/PageTitle';

import MaterialCalendar from './MaterialCalender';

export default function Calender() {
  return (
    <Stack sx={{ padding: { lg: "2rem", sm: "1rem", xs: "1rem", md: "1rem"}}}>
          <PageTitle title="Calender">
            <CalendarMonthIcon sx={{ color: "#0F4AC7" }} />
          </PageTitle>
          <MaterialCalendar defaultDate={new Date()}/>
    </Stack>
  )
}

