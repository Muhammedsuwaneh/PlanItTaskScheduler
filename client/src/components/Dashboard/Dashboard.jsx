import React, { useState } from 'react'
import { Box, Grid, Typography, Modal, Link, Fab, Stack } from '@mui/material'
import TaskForm from '../UI/TaskForm';
import AddTaskIcon from '@mui/icons-material/AddTask';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import VisibilityIcon from '@mui/icons-material/Visibility';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';

const Dashboard = ({ user, userTasks, userStatisticsEntries }) => {
      
  const [open, setOpen] = useState(false);
  const [tasks, setTasks] = useState(userTasks);
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

  const newAddedTaskHandler = ({ responseObject }) => {

        if(tasks.length >= 3) {
            tasks.pop();
            setTasks((prevTasks) => [responseObject, ...prevTasks]);
        }

        else if(tasks.length <= 0) {
            const arr = [];
            arr.push(responseObject);
            setTasks(arr);
        }

        else {
            setTasks((prevTasks) => [responseObject, ...prevTasks]);
        }

        handleClose();
  };

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
                    <Stack sx={{ margin: ".5rem 1rem"}}>
                        <Typography>{task.title}</Typography>
                        <Typography>{task.dateAdded}</Typography>
                    </Stack>
                </Box>
                <Box sx={{ display: "flex", padding: "1rem"}}>
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
        <Grid container sx={{ margin: "2rem 0"}}>
            <Grid item xs={7} sx={{ padding:"2rem", background: "#fff", height: "auto", margin: "0 1rem 0 0", borderRadius: "1rem"}}>
                <Typography sx={{ fontSize: "1.4rem", color: "#333"}}>
                    Upcoming Task
                </Typography>
                <Stack sx={{ margin: "1rem 0"}}>
                    {content}                    
                </Stack>
            </Grid>
            <Grid item xs={4} sx={{ padding: "1rem", background: "#fff", margin: "0 0 0 4.2rem", borderRadius: "1rem"}}>
                <Typography sx={{ fontSize: "1.4rem", color: "#333"}}>
                    Tasks Statistics
                </Typography>
            {userStatisticsEntries.map(entry => {
                    return (
                    <Box sx={{ background: `${getTaskStatusColor(entry[0])}`, borderRadius: "1rem", padding: ".5rem", 
                            margin: "1rem 0", display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                        <Box sx={{ display: "flex", padding: "1rem"}}>
                            <Fab sx={{ background:"#fff", color: "#000" }} aria-label="add">
                                    {getTaskIconHandler(entry[0])}
                            </Fab>
                        </Box>
                        <Box sx={{ display: "flex", color: "#fff" }}>                  
                                <Stack sx={{ margin: ".5rem 1rem", fontSize: "2rem"}}>
                                    <Typography>{entry[0]} Task</Typography>
                                    <Typography sx={{ fontSize: "2rem", textAlign: "right"}}>{entry[1]}</Typography>
                                </Stack>
                        </Box>
                    </Box>
                )
            })}
            </Grid>
        </Grid>
        </Box>
     </>
  )
}

export default Dashboard;