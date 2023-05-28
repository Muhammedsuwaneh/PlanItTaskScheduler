import React from 'react';
import { Box, Typography, Fab, Stack } from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { getTaskStatusColor, getTaskIconHandler } from './TaskList';

import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';
  
export const timeFixerHandler = (timeString) => {
  const timeStringArr = timeString.split(":");
  if(timeStringArr[0] < 10) return "0" + timeStringArr[0] + ":" + timeStringArr[1];
  else return timeString;
};

export default function TaskListContent({ onActionFired, tasksList, page }) {
  return (
    <Box sx={{ height: (page != "dashboard") ? "80vh" : "auto", overflowY: (page != "dashboard") ? "scroll" : ""}}>
       {tasksList.map(task => {
          return (<Stack key={task.id} sx={{ borderRadius: "1rem",  boxShadow: "0 1px 1px 0 rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.19)", 
            padding: "1rem", margin: { sm: "1rem 0", md: "1rem 0", xs: "1rem 0", lg: "1rem"},
           background: "#F9F9F9"}}>
                <Box sx={{  display: { lg: "flex", sm: "column", md: "flex", xs: "column"}, justifyContent: "space-between" }}>
                    <Box sx={{ display: "flex", alignItems: "center", margin: { lg: "1rem 0", sm: "0", md: "1rem 0", xs: "0"} }}>
                        <Fab sx={{ background:`${getTaskStatusColor(task.status)}`, color: "#fff", '&:hover': { background: "#333"} }} 
                        aria-label="add">
                        {getTaskIconHandler(task.status)}
                        </Fab>
                        <Stack sx={{ margin: { lg: ".5rem 0 .5rem .7rem", sm: "0 .7rem", md: ".5rem 0 .5rem .7rem", xs: "0 .7rem"}}}>
                            <Typography>{task.title}</Typography>
                        </Stack>
                    </Box>
                    <Box sx={{ display: "flex", padding: { sm: "1.2rem .5rem", md: "1.4rem", xs: "1.2rem .5rem", lg: "2rem 0"}}}>
                        <VisibilityIcon onClick={() => onActionFired("details", {...task})} 
                        sx={{ fontSize: "1.7rem", color: "#333", margin: "0", 
                        cursor: "pointer", transition: "opacity .5s ease-in", '&:hover': { opacity: '.7'}}}/>
                        {(task.status == "Completed") || 
                        <>
                          <TaskAltIcon onClick={() => onActionFired("mark", {...task})} 
                            sx={{ fontSize: "1.7rem", color: "#1976D2", margin: "0 .5rem", 
                            cursor: "pointer", transition: "opacity .5s ease-in", '&:hover': { opacity: '.7'}}}/>                        
                          <EditIcon onClick={() => onActionFired("update", {...task})} 
                            sx={{ fontSize: "1.7rem", color: "#F87D01", margin: "0 .5rem", 
                            cursor: "pointer", transition: "opacity .5s ease-in", '&:hover': { opacity: '.7'}}}/>
                          </>
                        }
                        <DeleteForeverIcon onClick={() => onActionFired("delete", {...task})} 
                        sx={{ fontSize: "1.7rem", color: "red", cursor: "pointer", transition: "opacity .5s ease-in", '&:hover': { opacity: '.7'}}} />
                    </Box>
                </Box>
                <Box sx={{ display: { sm: "flex", lg: "flex", xs:"column", md: "flex" }, margin: { sm: "0 rem", lg: "5px 1rem", xs:"0 .5rem" } }}>
                    <Box sx={{ display: "flex", marginRight: { sm: "0", lg: "1rem", xs:"0" }, marginBottom: { sm: "0", lg: "0", xs:".5rem" } }}>
                        <CalendarMonthIcon sx={{ color: "#333" }} />
                        <Typography sx={{ margin: "0 5px"}}>{task.dateAdded}</Typography>
                    </Box>
                    <Box sx={{ display: "flex" }}>
                        <QueryBuilderIcon sx={{ color: "#333" }} />
                        <Typography sx={{ margin: "0 5px"}}>{timeFixerHandler(task.startTime)} - {timeFixerHandler(task.endTime)}</Typography>
                    </Box>
                </Box>
            </Stack>)
      })}
    </Box>
  )
}
