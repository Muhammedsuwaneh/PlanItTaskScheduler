import React, { useState } from 'react';
import { Box, Stack, Typography, Modal, Button } from "@mui/material";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PageTitle from '../UI/PageTitle/PageTitle';

import MaterialCalendar from './MaterialCalender/MaterialCalender';
import CalenderTaskList from './CalenderTaskList/CalenderTaskList';

import ModalContent from '../UI/Modal/ModalContent';

export default function Calender({ userTasks }) {
  const [open, setOpen] = useState(false);
  const [clickedDate, setClickedDate] = useState();
  const [fullDate, setFullDate] = useState();
  const [selectedDateTask, setSelectedDateTask] = useState([]);

  const handleOpen = (fullDate, formattedDate) => {

    // get task for clicked date
    const filteredTask = userTasks.filter(task => task.dateAdded == fullDate);
    setClickedDate(formattedDate);
    setFullDate(fullDate);
    setSelectedDateTask(filteredTask);

    // show modal
    setOpen(true);
  }
  const handleClose = () => setOpen(false); 

  return (
    <Box>
        <Modal
            open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
              sx={{ margin: "0", padding: "0" }}>
              <ModalContent height="400px">
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                    <Typography>{clickedDate}</Typography>
                    <Button component="a" href={`/tasks/date/${fullDate}`}>Go to date</Button>
                  </Box>
                  <CalenderTaskList selectedTask={selectedDateTask}/>
              </ModalContent>
        </Modal>
        <Stack sx={{ padding: { lg: "2rem", sm: ".5rem", xs: ".5rem", md: "1rem"}}}>
          <PageTitle title="Calender">
            <CalendarMonthIcon sx={{ color: "#0F4AC7" }} />
          </PageTitle>
          <MaterialCalendar defaultDate={new Date()} handleOpen={handleOpen} tasks={userTasks}/>
        </Stack>
    </Box>
  )
}

