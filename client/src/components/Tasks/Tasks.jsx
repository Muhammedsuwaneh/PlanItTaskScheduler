import React, { useState, useEffect } from 'react';
import { Typography, Modal, Box, Grid, Stack, Link, Fab } from '@mui/material';
import AddTaskIcon from '@mui/icons-material/AddTask';
import TaskForm from '../UI/TaskForm';
import PageTitle from '../UI/PageTitle';
import { getTaskStatusColor, getTaskIconHandler } from './TaskList';
import TaskList from './TaskList';

import Toast from '../UI/Toast/Toast';

export default function Tasks({ userTasks, userStatistics }) {

  const [open, setOpen] = useState(false);
  const [content, setContent] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);  
  const [requestIsCompleted, setRequestIsCompleted] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");
  const [snackBarType, setSnackBarType] = useState("");

  const newAddedTaskHandler = ({ responseObject, message }) => {

        userTasks.unshift(responseObject);
        initDataHandler();
        handleClose();

        // user feedback
        if(responseObject == null) {
            setRequestIsCompleted(true);
            setSnackMessage(message);
            setSnackBarType("error");
            setDisableButton(false);
        }
        else {
            setSnackMessage(`${message} 😊`);
            setSnackBarType("success");
            setRequestIsCompleted(true);
        }
  };

  const successfullyDeletedTaskHandler = (listIsEmpty) => {
        if(listIsEmpty === true) userTasks = [];
        initDataHandler();
  };

  const initDataHandler = () => {

    if(userTasks.length <= 0) {
        setContent(<Typography sx={{ fontSize: "2rem", marginTop: "7rem", textAlign: "center"}}>No task available 😳</Typography>);
    }
    
    else {
        setContent(<TaskList userTasks={userTasks} onDeleteSuccessful={successfullyDeletedTaskHandler}/>);
      }
  }

  useEffect(() => {
    initDataHandler();
  }, [userTasks, userStatistics, setContent]);
    
  return (
    <>
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description">
            <Box>
                <TaskForm onModalClose={handleClose} onNewTaskAdded={newAddedTaskHandler} 
                itemObject={{id: "", title: "", description: "", dateAdded: "", status: ""}} action="new"/>
            </Box>
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
            {content}
        </Box>
        {requestIsCompleted && <Toast snackBarType={snackBarType} snackMessage={snackMessage} /> }
    </Stack>
    </>
  )
}
