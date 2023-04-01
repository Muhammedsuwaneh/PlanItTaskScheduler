import React, { useState, useEffect } from 'react';
import { Typography, Modal, Box, Grid, Stack, Link, Fab } from '@mui/material';
import AddTaskIcon from '@mui/icons-material/AddTask';
import TaskForm from '../UI/TaskForm';
import PageTitle from '../UI/PageTitle';
import { getTaskStatusColor, getTaskIconHandler } from './TaskList';
import TaskList from './TaskList';

export default function Tasks({ userTasks, userStatistics }) {

  const [open, setOpen] = useState(false);
  const [content, setContent] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);  

  const newAddedTaskHandler = () => {

  };

  const initDataHandler = () => {

    if(userTasks.length <= 0) {
        setContent(<Typography sx={{ fontSize: "2rem", marginTop: "7rem", textAlign: "center"}}>No task available 😳</Typography>);
    }
    
    else {
        setContent(<TaskList userTasks={userTasks} />);
      }
  }

  useEffect(() => {
    initDataHandler();
  }, [userTasks, userStatistics, setContent]);
    
  return (
    <Stack sx={{ padding: { lg: "2rem", sm: "1rem", xs: "1rem", md: "1rem"} }}>
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description">
            <Box>
                <TaskForm onModalClose={handleClose} onNewTaskAdd={newAddedTaskHandler}/>
            </Box>
        </Modal>
        <PageTitle title="Tasks">
            <Link onClick={handleOpen}>
                <Fab color="primary" aria-label="add" sx={{ padding: ".5rem"}}>
                    <AddTaskIcon sx={{fontSize: "1.3rem"}}/>
                </Fab>
            </Link>
        </PageTitle>
        <Box>
            {content}
        </Box>
    </Stack>
  )
}
