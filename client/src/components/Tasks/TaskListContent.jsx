import React from 'react';
import { Box, Typography, Fab, Stack } from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { getTaskStatusColor, getTaskIconHandler } from './TaskList';

export default function TaskListContent({ onActionFired, tasksList }) {
  return (
    <>
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
                            <VisibilityIcon onClick={() => onActionFired("update", {...task})} 
                            sx={{ fontSize: "2rem", color: "#333", margin: "0 .5rem", cursor: "pointer", transition: "opacity .5s ease-in", '&:hover': { opacity: '.7'}}}/>
                            <DeleteForeverIcon onClick={() => onActionFired("delete", {...task})} 
                            sx={{ fontSize: "2rem", color: "red", cursor: "pointer", transition: "opacity .5s ease-in", '&:hover': { opacity: '.7'}}} />
                        </Box>
                    </Box>
                )
        })}
    </>
  )
}
