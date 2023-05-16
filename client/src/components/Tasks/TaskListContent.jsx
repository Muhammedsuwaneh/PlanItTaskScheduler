import React from 'react';
import { Box, Typography, Fab, Stack } from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { getTaskStatusColor, getTaskIconHandler } from './TaskList';

export default function TaskListContent({ onActionFired, tasksList, page }) {
  return (
    <Box sx={{ height: (page != "dashboard") ? "80vh" : "auto", overflowY: (page != "dashboard") ? "scroll" : ""}}>
        {tasksList.map(task => {
                return (
                    <Box key={task.id} sx={{ borderRadius: "1rem",  boxShadow: "0 1px 1px 0 rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.19)", 
                    padding: "1rem", margin: { sm: "1rem 0", md: "1rem 0", xs: "1rem 0", lg: "1rem"},
                    display: "flex", justifyContent: "space-between", background: "#F9F9F9"}}>
                        <Box sx={{ display: { sm: "column", xs: "column", md: "flex", lg: "flex"}, margin: { lg: "1rem 0", sm: "0", md: "1rem 0", xs: "0"} }}>
                            <Fab sx={{ background:`${getTaskStatusColor(task.status)}`, color: "#fff", '&:hover': { background: "#333"} }} aria-label="add">
                            {getTaskIconHandler(task.status)}
                            </Fab>
                            <Stack sx={{ margin: { lg: ".5rem 0 .5rem .7rem", sm: "1rem 0", md: ".5rem 0 .5rem .7rem", xs: "1rem 0"}}}>
                                <Typography>{task.title}</Typography>
                                <Typography>{task.dateAdded}</Typography>
                            </Stack>
                        </Box>
                        <Box sx={{ display: "flex", padding: { sm: "1.2rem 0", md: "1.4rem", xs: "1.2rem 0", lg: "2rem 0"}}}>
                            <VisibilityIcon onClick={() => onActionFired("update", {...task})} 
                            sx={{ fontSize: "1.7rem", color: "#333", margin: "0 .5rem", 
                            cursor: "pointer", transition: "opacity .5s ease-in", '&:hover': { opacity: '.7'}}}/>
                            <TaskAltIcon onClick={() => onActionFired("update", {...task})} 
                            sx={{ fontSize: "1.7rem", color: "#333", margin: "0 .5rem", 
                            cursor: "pointer", transition: "opacity .5s ease-in", '&:hover': { opacity: '.7'}}}/>
                            <EditIcon onClick={() => onActionFired("update", {...task})} 
                            sx={{ fontSize: "1.7rem", color: "#333", margin: "0 .5rem", 
                            cursor: "pointer", transition: "opacity .5s ease-in", '&:hover': { opacity: '.7'}}}/>
                            <DeleteForeverIcon onClick={() => onActionFired("delete", {...task})} 
                            sx={{ fontSize: "1.7rem", color: "red", cursor: "pointer", transition: "opacity .5s ease-in", '&:hover': { opacity: '.7'}}} />
                        </Box>
                    </Box>
                )
        })}
    </Box>
  )
}
