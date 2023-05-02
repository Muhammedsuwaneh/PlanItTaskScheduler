import React, { useState } from 'react';
import { Box, Stack, Typography, Modal } from "@mui/material";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PageTitle from '../UI/PageTitle';

import MaterialCalendar from './MaterialCalender';

export default function Calender() {
  const [open, setOpen] = useState(false);
  const [clickedDate, setClickedDate] = useState();
  const handleOpen = (selectedTask, date) => {
    setClickedDate(date);
    setOpen(true);
  }
  const handleClose = () => setOpen(false); 

  return (
    <>
        <Modal
            open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description">
            <Box sx={{ background: "#fff", height: "200px", width: "200px", position: "relative"}}>
            <Typography>{clickedDate}</Typography>
            </Box>
        </Modal>
        <Stack sx={{ padding: { lg: "2rem", sm: "1rem", xs: "1rem", md: "1rem"}}}>
          <PageTitle title="Calender">
            <CalendarMonthIcon sx={{ color: "#0F4AC7" }} />
          </PageTitle>
          <MaterialCalendar defaultDate={new Date()} handleOpen={handleOpen}/>
        </Stack>
    </>
  )
}

