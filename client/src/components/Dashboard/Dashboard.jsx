import React, { useEffect, useState } from 'react'
import { Box, Grid, Button, Typography, Modal, Link, Fab, Stack } from '@mui/material'
import TaskForm from '../UI/TaskForm/TaskForm';
import AddTaskIcon from '@mui/icons-material/AddTask';
import ModalContent from '../UI/Modal/ModalContent';

import Doughnut from '../UI/Charts/Doughnut/DoughnutChart';
import LineChart from '../UI/Charts/LineChart/LineChart';

import ReadOnlyCalender from '../Calender/ReadOnlyCalender/ReadOnlyCalender';

import Toast from '../UI/Toast/Toast';

import { getTaskIconHandler, getTaskStatusColor } from '../Tasks/TaskList';
import TaskList from '../Tasks/TaskList';

const Dashboard = ({ user, userTasks, userStatisticsEntries, taskCountEveryMonth }) => {
      
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [disableButton, setDisableButton] = useState(false);
  const [requestIsCompleted, setRequestIsCompleted] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");
  const [snackBarType, setSnackBarType] = useState("");

  
  const doughnutChartData = {
      labels: ['Ongoing', 'Completed'],
      datasets: [
      {
          data: [userStatisticsEntries.Ongoing, userStatisticsEntries.Completed],
          backgroundColor: [`${getTaskStatusColor("Ongoing")}`,  
          `${getTaskStatusColor("Completed")}`],
      },
      ],
      borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
      ],
      borderWidth: 1,
  };

  const lineChartdata = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    datasets: [
        {
        label: 'Total Task',
        data: Object.values(taskCountEveryMonth),
        borderColor: '#1976D2',
        backgroundColor: '#1976D2',
        },
    ],
  };

  const newAddedTaskHandler = async ({ responseObject, message }) => {

        if(userTasks.length == 4)
            userTasks.pop();

        userStatisticsEntries.Ongoing += 1;
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
            userStatisticsEntries.Ongoing -= 1;
            if(listIsEmpty === true) userTasks = [];

            else 
                // remove deleted task from list

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
        setSnackMessage("oops! something went wrong");
        setSnackBarType("error");
    }
  };

  const initDataHandler = () => {

    if(userTasks.length <= 0) 
        setContent(<Typography sx={{ fontSize: "2rem", marginTop: "15rem", textAlign: "center"}}>No task available 😳</Typography>); 
    else {
        setContent(
            <>
                <Stack sx={{ margin: "1rem 0"}}>
                    <TaskList userTasks={userTasks} currentPage="dashboard" onDeleteSuccessful={deleteHandler} onTaskUpdate={updateTaskHandler}/>                   
                </Stack>
                <Box sx={{ padding: "1.4rem", background: "#fff", 
                    margin: "0", borderRadius: "1rem", width: "100%",
                    alignItems:"center", justifyContent: "center", display: "flex"}}>
                        {(userTasks.length == 0) || <LineChart data={lineChartdata}/> }
                </Box>
            </>
        );
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
            <ModalContent height="auto">
                <TaskForm onModalClose={handleClose} onNewTaskAdded={newAddedTaskHandler} action="new" 
                itemObject={{id: "", title: "", description: "", dateAdded: "", status: "", startTime: "", endTime: ""}}/>
            </ModalContent>
        </Modal>
        <Stack sx={{ padding: { lg: "0 2rem", sm: "10px", xs: "10px", md: "5px"} }}>
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
            <Stack sx={{ width: { lg: "70%", sm:"100%", md: "100%", xs: "100%"}, 
            padding: { lg: "2rem", sm: "1rem", xs: "1rem", md: "1rem"}, background: "#fff", 
            height: (userTasks.length < 0) ? { xs: "50vh", sm:"50vh", md:"50vh", lg: "150vh" } : { xs: "auto", sm:"auto", md:"auto", lg: "auto" }, 
            margin: { lg: "0 1rem 0 0", sm:"1rem 0", md: "1rem 0",xs: "1rem 0"}, borderRadius: "1rem"}}>
                <Typography sx={{ fontSize: "1.4rem", color: "#333", marginLeft: "1rem"}}>
                    Upcoming Task
                </Typography>
                {content}
            </Stack>
            <Stack sx={{ width: { lg: "30%", xs: "100%", sm: "100%", md: "100%"}, padding: { lg: "0 1rem", sm: "0", xs: "0", md: "0"}, margin: "0" }}>
                    <Stack sx={{ padding: "1rem", background: "#fff", margin: { lg: "0 0 0 1rem", sm: "0", md: "0", xs: "0"}, borderRadius: "1rem", width: "100%"}}>
                        <Typography sx={{ fontSize: "1.4rem", color: "#333"}}>
                        Tasks Statistics
                        </Typography>
                        <Box sx={{ background: `${getTaskStatusColor("Ongoing")}`, borderRadius: "1rem", padding: ".5rem", 
                                margin: "1rem 0", display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                            <Box sx={{ display: "flex", padding: "1rem"}}>
                                <Fab sx={{ background:"#fff", color: "#000" }} aria-label="add">
                                        {getTaskIconHandler("Ongoing")}
                                </Fab>
                            </Box>
                            <Box sx={{ display: "flex", color: "#fff" }}>                  
                                    <Stack sx={{ margin: ".5rem 1rem", fontSize: "2rem"}}>
                                        <Typography>Ongoing</Typography>
                                        <Typography sx={{ fontSize: "2rem", textAlign: "right"}}>{userStatisticsEntries.Ongoing}</Typography>
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
                    <Box sx={{ height: "auto", padding: "1rem 0", background: "#fff", 
                    margin: { lg: "1rem 0 0 1rem", sm: "1rem 0", md: "1rem 0", xs: "1rem 0"}, borderRadius: "1rem", width: "100%",
                    alignItems:"center", justifyContent: "center", display: "flex"}}>
                        <ReadOnlyCalender />
                    </Box>
                    <Box sx={{ height: "43vh", padding: "1.4rem", background: "#fff", 
                    margin: { lg: "1rem 0 0 1rem", sm: "1rem 0", md: "1rem 0", xs: "1rem 0"}, borderRadius: "1rem", width: "100%",
                    alignItems:"center", justifyContent: "center", display: "flex"}}>
                        <Doughnut data={doughnutChartData}/> 
                    </Box>
            </Stack>
        </Box>
        {requestIsCompleted && <Toast snackBarType={snackBarType} snackMessage={snackMessage} /> }
        </Stack>
     </>
  )
}

export default Dashboard;
