import React from 'react'
import VisibilityIcon from '@mui/icons-material/Visibility';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import DeleteForeverIcon from "@mui/icons-material/DeleteForever"
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import { Box, Grid, Typography, Modal, Link, Fab, Stack } from '@mui/material'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export const getTaskStatusColor = (status) => {
    switch(status) {
        case "Pending": 
            return "#F87D01";
        case "Completed":
            return "#1976D2";
    }
  };

export const getTaskIconHandler = (status) => {
    switch(status) {
        case "Pending": 
            return <HourglassBottomIcon />;
        case "Completed":
            return <TaskAltIcon />;
    }
};

export default function TaskList({ userTasks, currentPage }) {

  const [status, setStatus] = React.useState('All');
  const [tasksList, setTaskList] = React.useState(userTasks);

  const handleChange = (event) => {
    setStatus(event.target.value);

    if(event.target.value == "All") {
        setTaskList(userTasks);
    }
    else {
        const newtaskList = userTasks.filter((task) => task.status == event.target.value);
        setTaskList(newtaskList);
    }
  };

  return (
    <>
        {(currentPage == "dashboard") || <Box>
            <Box sx={{ minWidth: 120, display: "flex" }}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Status</InputLabel>
                    <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={status}
                    label="Status"
                    onChange={handleChange}
                    >
                    <MenuItem value="All">All</MenuItem>
                    <MenuItem value="Pending">Pending</MenuItem>
                    <MenuItem value="Completed">Completed</MenuItem>
                    </Select>
                </FormControl>
            </Box>
        </Box>}
        <Box>
            {tasksList.map(task => {
                return (
                    <Box key={task.id} sx={{ borderRadius: "1rem", border: `1px solid ${getTaskStatusColor(task.status)}`, padding: "1rem", margin: "1rem 0", display: "flex", justifyContent: "space-between"}}>
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
                            <VisibilityIcon sx={{ fontSize: "2rem", color: "#333", margin: "0 .5rem", cursor: "pointer", transition: "opacity .5s ease-in", '&:hover': { opacity: '.7'}}}/>
                            <DeleteForeverIcon sx={{ fontSize: "2rem", color: "red", cursor: "pointer", transition: "opacity .5s ease-in", '&:hover': { opacity: '.7'}}} />
                        </Box>
                    </Box>
                )
            })}
        </Box>
    </>
  )
}
