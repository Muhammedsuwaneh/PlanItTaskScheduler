import React, { useEffect, useState } from 'react'
import { Box, Grid, Typography, Modal, Link, Fab, Stack } from '@mui/material'
import TaskForm from '../UI/TaskForm';
import AddTaskIcon from '@mui/icons-material/AddTask';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import { CChart } from "@coreui/react-chartjs";
import { getCookie } from "cookies-next"

import { getUserTask, getUserTaskStatistics } from '@/pages/api/userTaskApi';

const Dashboard = ({ user, userTasks, userStatisticsEntries }) => {
      
  const [open, setOpen] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [statistics, setStatistics] = useState([]);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const getTaskStatusColor = (status) => {
    switch(status) {
        case "Pending": 
            return "#F87D01";
        case "Completed":
            return "#1976D2";
    }
  };

  const getTaskIconHandler = (status) => {
    switch(status) {
        case "Pending": 
            return <HourglassBottomIcon />;
        case "Completed":
            return <TaskAltIcon />;
    }
  };

  const newAddedTaskHandler = async ({ responseObject }) => {

        if(tasks.length >= 3) {
            tasks.pop();
            setTasks((prevTasks) => [responseObject, ...prevTasks]);
        }

        else if(tasks.length == 0) {

            const token = getCookie("USER_AUTH_TOKEN");

            await getUserTask({ token })
            .then(res => {
                setTasks(res);
            });

            await getUserTaskStatistics({ token })
            .then(res => {
                setStatistics(res);
            });
        }

        else {
            setTasks((prevTasks) => [responseObject, ...prevTasks]);
        }

        handleClose();
  };

  const copyToClipBoardHandler = (task) => {
    navigator.clipboard.writeText(task);
  }

  useEffect(() => {
    setTasks(userTasks);
    setStatistics(userStatisticsEntries);
  }, [userTasks, userStatisticsEntries]);

  let content = "";

  if(userTasks.length <= 0) {
    content = <Typography sx={{ fontSize: "2rem", marginTop: "7rem", textAlign: "center"}}>No task available 😳</Typography>
  }

  else {
    content = tasks.map(task => {
        return (
            <Box key={task.id} sx={{ borderRadius: "1rem", border: "1px solid #F87D01", padding: "1rem", margin: "1rem 0", display: "flex", justifyContent: "space-between"}}>
                <Box sx={{ display: "flex"}}>
                    <Fab sx={{ background:`${getTaskStatusColor(task.status)}`, color: "#fff", '&:hover': { background: "#333"} }} aria-label="add">
                       {getTaskIconHandler(task.status)}
                    </Fab>
                    <Stack sx={{ margin: ".5rem 0 .5rem .7rem"}}>
                        <Typography>{task.title}</Typography>
                        <Typography>{task.dateAdded}</Typography>
                    </Stack>
                </Box>
                <Box sx={{ display: "flex", padding: "1rem"}}>
                    <EditIcon sx={{ fontSize: "2rem", color: "#F87D01", cursor: "pointer", transition: "opacity .5s ease-in", '&:hover': { opacity: '.7'}}} />
                    <ContentCopyIcon onClick={() => copyToClipBoardHandler(task.title)} sx={{ fontSize: "2rem", color: "#333", cursor: "pointer", transition: "opacity .5s ease-in", '&:hover': { opacity: '.7'}}} />
                    <VisibilityIcon sx={{ fontSize: "2rem", color: "#333", margin: "0 .5rem", cursor: "pointer", transition: "opacity .5s ease-in", '&:hover': { opacity: '.7'}}}/>
                    <DeleteForeverIcon sx={{ fontSize: "2rem", color: "red", cursor: "pointer", transition: "opacity .5s ease-in", '&:hover': { opacity: '.7'}}} />
                </Box>
            </Box>
        )
    })
  }

  return (
     <>
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description">
            <Box>
                <TaskForm onModalClose={handleClose} onNewTaskAdd={newAddedTaskHandler}/>
            </Box>
        </Modal>
        <Box sx={{ padding: "2rem" }}>
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
        <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, margin: { xs: "0", sm: "2rem 0" }, height: "auto"}}>
            <Stack sx={{ width: { sm: "70%", xs: "100%"}, padding: "2rem", background: "#fff", height: "auto", margin: { sm: "0 1rem 0 0", xs: "1rem 0"}, borderRadius: "1rem"}}>
                <Typography sx={{ fontSize: "1.4rem", color: "#333"}}>
                    Upcoming Task
                </Typography>
                <Stack sx={{ margin: "1rem 0"}}>
                    {content}                    
                </Stack>
            </Stack>
            <Stack sx={{ width: { sm: "30%", xs: "100%"}, padding: { sm: "0 2rem 0 0", xs: "0"}, margin: "0" }}>
                    <Stack sx={{ padding: "1rem", background: "#fff", margin: { sm: "0 0 0 2rem", xs: "0"}, borderRadius: "1rem", width: "100%"}}>
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
                                        <Typography sx={{ fontSize: "2rem", textAlign: "right"}}>{statistics.Pending}</Typography>
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
                                        <Typography sx={{ fontSize: "2rem", textAlign: "right"}}>{statistics.Completed}</Typography>
                                    </Stack>
                            </Box>
                        </Box>
                    </Stack>
                    <Box sx={{ height:"auto", padding: "1.4rem", background: "#fff", margin: { sm: "1rem 0 0 2rem", xs: "1rem 0"}, borderRadius: "1rem", width: "100%"}}>
                        {(userTasks.length == 0) || <CChart
                            type="doughnut"
                            data={{
                                labels: ['Pending', 'Completed'],
                                datasets: [
                                {
                                    data: [statistics.Pending, statistics.Completed],
                                    backgroundColor: [`${getTaskStatusColor("Pending")}`,  
                                    `${getTaskStatusColor("Completed")}`],
                                },
                                ],
                            }}
                        />}
                    </Box>
            </Stack>
        </Box>
        </Box>
     </>
  )
}

export default Dashboard;