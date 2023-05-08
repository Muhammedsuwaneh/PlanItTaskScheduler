import React, { useState } from 'react';
import { Box, Stack, Typography, Modal } from "@mui/material";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PageTitle from '../UI/PageTitle/PageTitle';

import MaterialCalendar from './MaterialCalender';

import ModalContent from '../UI/Modal/ModalContent';

export default function Calender({ userTasks }) {
  const [open, setOpen] = useState(false);
  const [clickedDate, setClickedDate] = useState();
  const [selectedDateTask, setSelectedDateTask] = useState([]);

  const handleOpen = (date) => {

    // get task for clicked date
    //const filteredTask = userTasks.filter(task => task.dateAdded == ); 

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
              aria-describedby="modal-modal-description"
              sx={{ overflow: "hidden", margin: "0", padding: "0" }}>
            <ModalContent>
              <Typography>{clickedDate}</Typography>
            </ModalContent>
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

