import React, { useState, useEffect } from 'react';
import { Modal, Box, Grid, Stack, Link, Fab } from '@mui/material';
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
  const [requestIsCompleted, setRequestIsCompleted] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");
  const [snackBarType, setSnackBarType] = useState("");
  const [tasks, setTasks] = useState(userTasks);

  const newAddedTaskHandler = ({ responseObject, message }) => {

        userTasks.unshift(responseObject);
        setTasks(userTasks);
        initDataHandler();
        handleClose();

        // user feedback
        if(responseObject == null) {
            setRequestIsCompleted(true);
            setDisableButton(false);
            feedbackHandler("error", "something went wrong 😢");
        }
        else {
            setRequestIsCompleted(true);
            feedbackHandler("success", message);
        }
  };

  const successfullyDeletedTaskHandler = (isSuccessful) => {
        setRequestIsCompleted(true);
        if(isSuccessful)
            feedbackHandler("success", "task deleted");
        else       
            feedbackHandler("error", "oops! something went wrong")
  };

  const updateTaskHandler = (isUpdated) => {
        setRequestIsCompleted(true);
        if(isUpdated) 
            feedbackHandler("success", "task updated");
        else 
            feedbackHandler("error", "oops! something went wrong");
  };

  const marktaskascomplete = (response) => {
    setRequestIsCompleted(true);
    if(response == null)
        feedbackHandler("error", "oops! something went wrong");
    else
        feedbackHandler("success", "task marked as completed");
  };

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
                <TaskForm onModalClose={handleClose} onNewTaskAdded={newAddedTaskHandler} 
                itemObject={{id: "", title: "", description: "", dateAdded: "", status: ""}} action="new"/>
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
            <TaskList userTasks={tasks} 
            onDeleteSuccessful={successfullyDeletedTaskHandler} 
            onTaskUpdate={updateTaskHandler}
            onMarktaskascomplete={marktaskascomplete}
            />
        </Box>
        {requestIsCompleted && <Toast snackBarType={snackBarType} snackMessage={snackMessage} /> }
    </Stack>
    </>
  )
}
