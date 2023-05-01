import React, { useEffect, useState } from 'react'
import { Box, Grid, Typography, Modal, Link, Fab, Stack } from '@mui/material'
import TaskForm from '../UI/TaskForm';
import AddTaskIcon from '@mui/icons-material/AddTask';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import Backdrop from '@mui/material/Backdrop';
import { CChart } from "@coreui/react-chartjs";
import { getCookie } from "cookies-next"

import Toast from '../UI/Toast/Toast';

import { getTaskIconHandler, getTaskStatusColor } from '../Tasks/TaskList';
import TaskList from '../Tasks/TaskList';

const Dashboard = ({ user, userTasks, userStatisticsEntries }) => {
      
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState();
  const [isLoadingTasks, setIsLoadingTasks] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [sendingRequest, setSendingRequest] = useState("none");
  const [disableButton, setDisableButton] = useState(false);
  const [requestIsCompleted, setRequestIsCompleted] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");
  const [snackBarType, setSnackBarType] = useState("");

  const newAddedTaskHandler = async ({ responseObject, message }) => {

        if(userTasks.length == 4)
            userTasks.pop();

        userStatisticsEntries.Pending += 1;
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

  const deleteHandler = (listIsEmpty, isSuccessful) => {

        setRequestIsCompleted(true);

        if(isSuccessful) {
            userStatisticsEntries.Pending -= 1;
            if(listIsEmpty === true) {
                userTasks = [];
            }

            initDataHandler();
            setSnackMessage("task deleted");
            setSnackBarType("success");
        }

        else {             
            setSnackMessage("oops! something went wrong");
            setSnackBarType("oerror");
        }
  };

  const updateTaskHandler = (isUpdated) => {
    setRequestIsCompleted(true);
    
    if(isUpdated) {
        setSnackMessage("task updated");
        setSnackBarType("success");
    }
    else {
        setSnackMessage("oops! something went wronf");
        setSnackBarType("error");
    }
  };

  const initDataHandler = () => {

    if(userTasks.length <= 0) {
        setContent(<Typography sx={{ fontSize: "2rem", marginTop: "7rem", textAlign: "center"}}>No task available 😳</Typography>);
    }
    
    else {
        setContent(<TaskList userTasks={userTasks} currentPage="dashboard" onDeleteSuccessful={deleteHandler}
        onTaskUpdate={updateTaskHandler}/>);
      }
  }

  useEffect(() => {
    initDataHandler();
  }, [userTasks, userStatisticsEntries, setContent]);

  return (
     <>
        <Modal
             open={open}
             onClose={handleClose}
             aria-labelledby="modal-modal-title"
             aria-describedby="modal-modal-description">
            <Box>
                <TaskForm onModalClose={handleClose} onNewTaskAdded={newAddedTaskHandler} action="new" 
                itemObject={{id: "", title: "", description: "", dateAdded: "", status: ""}}/>
            </Box>
        </Modal>
        <Stack sx={{ padding: "2rem" }}>
        <Box sx={{ background: "#fff", padding: "1rem", borderRadius: "1rem", display: "flex", justifyContent: "space-between"}}>
            <Box sx={{ padding: "1rem"}}>
                    <Typography sx={{ fontSize: "2rem"}}>Welcome - <span style={{ color: "#1976D2"}}>{user} </span> 😊</Typography>
                    <Typography sx={{ marginTop: "1rem", fontSize: "1.2rem"}}>Let's do something today</Typography>
            </Box>
            <Box>
            <Link onClick={handleOpen}>
                <Fab color="primary" aria-label="add">
                    <AddTaskIcon />
                </Fab>
            </Link>
            </Box>
        </Box>
        <Box sx={{ display: "flex", flexDirection: { xs: "column", sm:"column",md:"column", lg: "row" }, margin: { xs: "0", sm:"0", md:"0", lg: "2rem 0" }, height: "auto"}}>
            <Stack sx={{ width: { lg: "70%", sm:"100%", md: "100%", xs: "100%"}, padding: "2rem", background: "#fff", height: "auto", 
            margin: { lg: "0 1rem 0 0", sm:"1rem 0", md: "1rem 0",xs: "1rem 0"}, borderRadius: "1rem"}}>
                <Typography sx={{ fontSize: "1.4rem", color: "#333"}}>
                    Upcoming Task
                </Typography>
                <Stack sx={{ margin: "1rem 0"}}>
                    {content}                    
                </Stack>
            </Stack>
            <Stack sx={{ width: { lg: "30%", xs: "100%", sm: "100%", md: "100%"}, padding: { lg: "0 2rem 0 0", sm: "0", md: "0", xs: "0"}, margin: "0" }}>
                    <Stack sx={{ padding: "1rem", background: "#fff", margin: { lg: "0 0 0 2rem", sm: "0", md: "0", xs: "0"}, borderRadius: "1rem", width: "100%"}}>
                        <Typography sx={{ fontSize: "1.4rem", color: "#333"}}>
                        Tasks Statistics
                        </Typography>
                        <Box sx={{ background: `${getTaskStatusColor("Pending")}`, borderRadius: "1rem", padding: ".5rem", 
                                margin: "1rem 0", display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                            <Box sx={{ display: "flex", padding: "1rem"}}>
                                <Fab sx={{ background:"#fff", color: "#000" }} aria-label="add">
                                        {getTaskIconHandler("Pending")}
                                </Fab>
                            </Box>
                            <Box sx={{ display: "flex", color: "#fff" }}>                  
                                    <Stack sx={{ margin: ".5rem 1rem", fontSize: "2rem"}}>
                                        <Typography>Pending</Typography>
                                        <Typography sx={{ fontSize: "2rem", textAlign: "right"}}>{userStatisticsEntries.Pending}</Typography>
                                    </Stack>
                            </Box>
                        </Box>
                        <Box sx={{ background: `${getTaskStatusColor("Completed")}`, borderRadius: "1rem", padding: ".5rem", 
                                margin: "1rem 0", display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                            <Box sx={{ display: "flex", padding: "1rem"}}>
                                <Fab sx={{ background:"#fff", color: "#000" }} aria-label="add">
                                        {getTaskIconHandler("Completed")}
                                </Fab>
                            </Box>
                            <Box sx={{ display: "flex", color: "#fff" }}>                  
                                    <Stack sx={{ margin: ".5rem 1rem", fontSize: "2rem"}}>
                                        <Typography>Completed</Typography>
                                        <Typography sx={{ fontSize: "2rem", textAlign: "right"}}>{userStatisticsEntries.Completed}</Typography>
                                    </Stack>
                            </Box>
                        </Box>
                    </Stack>
                    <Box sx={{ height:"auto", padding: "1.4rem", background: "#fff", 
                    margin: { lg: "1rem 0 0 2rem", sm: "1rem 0", md: "1rem 0", xs: "1rem 0"}, borderRadius: "1rem", width: "100%"}}>
                        {(userTasks.length == 0) || <CChart
                            type="doughnut"
                            data={{
                                labels: ['Pending', 'Completed'],
                                datasets: [
                                {
                                    data: [userStatisticsEntries.Pending, userStatisticsEntries.Completed],
                                    backgroundColor: [`${getTaskStatusColor("Pending")}`,  
                                    `${getTaskStatusColor("Completed")}`],
                                },
                                ],
                            }}
                        />}
                    </Box>
            </Stack>
        </Box>
        {requestIsCompleted && <Toast snackBarType={snackBarType} snackMessage={snackMessage} /> }
        </Stack>
     </>
  )
}

export default Dashboard;