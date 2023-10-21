import React, { useState, useEffect } from 'react';
import { Typography, Modal, Box, Grid, Stack, Link, Fab } from '@mui/material';
import AddTaskIcon from '@mui/icons-material/AddTask';
import TaskForm from '../UI/TaskForm/TaskForm';
import PageTitle from '../UI/PageTitle/PageTitle';
import TaskList from './TaskList';

import ModalContent from '../UI/Modal/ModalContent';

import Toast from '../UI/Toast/Toast';

export default function Tasks({ userTasks }) {

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);  
  const [snackMessage, setSnackMessage] = useState("");
  const [snackBarType, setSnackBarType] = useState("");
  const [requestIsCompleted, setRequestIsCompleted] = useState(false);

  const newAddedTaskHandler = (responseObject, response) => {
        // close modal,
        handleClose();
        // user feedback
        if(response) {
            // add new task to list
            userTasks.unshift(responseObject);
            setRequestIsCompleted(true);
            feedbackHandler("success", "Task added");
        }
        else {
            setRequestIsCompleted(true);
            feedbackHandler("error", "something went wrong 😢");
        }
  }

  const feedbackHandler = (type, message) => {
    setSnackMessage(message);
    setSnackBarType(type);
  }

  return (
    <>
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description">
            <ModalContent>
                <TaskForm onModalClose={handleClose} onNewTaskAdded={newAddedTaskHandler} action="new" 
                    itemObject={{id: "", title: "", description: "", dateAdded: "", status: "", startTime: "", endTime: ""}}/>
            </ModalContent>
        </Modal>
        <Stack sx={{ padding: { lg: "2rem", sm: "1rem", xs: "1rem", md: "1rem"} }}>
        <PageTitle title="Tasks">
            <Link onClick={handleOpen}>
                <Fab color="primary" aria-label="add" sx={{ padding: ".5rem"}}>
                    <AddTaskIcon sx={{fontSize: "1.3rem"}}/>
                </Fab>
            </Link>
        </PageTitle>
        <Box sx={{ background: "#fff", padding: "1.3rem", margin: "1rem 0", borderRadius: "1rem"}}>
            <TaskList userTasks={userTasks} />
        </Box>
        {requestIsCompleted && <Toast snackBarType={snackBarType} snackMessage={snackMessage} /> }
    </Stack>
    </>
  )
}
