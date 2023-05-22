import React, { useState } from 'react'
import { Stack, TextField, FormControl, InputLabel, MenuItem, Box, Button, Typography, Divider } from "@mui/material";
import AddTaskIcon from '@mui/icons-material/AddTask';
import EditIcon from '@mui/icons-material/Edit';
import dayjs from 'dayjs';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

import { getCookie } from "cookies-next";

import { updateUserTaskRequest } from '@/pages/api/userTaskApi';

export default function TaskForm({ onModalClose, onNewTaskAdded, onUpdateTask, itemObject, action } ) {
  
const getTodaysDay = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    const formattedDate = `${year}-${month}-${day}`;

    return formattedDate;
};

const getTimer = (timer) => {
    let minutes = "";
    (timer.getMinutes() < 10) ? minutes = "0"+timer.getMinutes() : minutes = timer.getMinutes();
    const fullDateTime = fixDateHandler(dateAdded) + "T" + timer.getHours() + ":" + minutes;
    return fullDateTime;
};


  const [taskId, setTaskId] = useState(itemObject.id);
  const [title, setTitle] = useState(itemObject.title);
  const [description, setDescription] = useState(itemObject.description);
  const [status, setStatus] = useState(itemObject.status);
  const [startTime, setStartTime] = useState((itemObject.startTime != "") ? itemObject.startTime : dayjs());
  const [endTime, setEndTime] = useState((itemObject.endTime != "") ? itemObject.endTime : dayjs());
  const [dateAdded, setDateAdded] = useState((itemObject.dateAdded != "") ? itemObject.dateAdded : getTodaysDay(new Date()));
  const [disableButton, setDisableButton] = useState(false);


  const formSubmissionHandler = async (event) => {

    event.preventDefault();
    const token = getCookie("USER_AUTH_TOKEN");
    setDisableButton(true);

    if(action == "new") await sendNewTaskRequest(token);
    else if(action == "update") await updateSelectedTaskRequest(token);
  };

  // validate time 

  const fixDateHandler = (date) => {
    let dateArr = "";
    if(date == "")
        date = dateAdded

    dateArr = date.toISOString().split('T')[0].split('-');
    let tempDay = "";
    if(+dateArr[2]+1 < 10) 
        tempDay = "0" + (+dateArr[2]+1);
    else 
        tempDay = +dateArr[2]+1;
    const newDate = `${dateArr[0]}-${dateArr[1]}-${tempDay}`;
    return newDate;
  }

  const sendNewTaskRequest = async(token) => {
    
    let newTask = { 
        title: title,
        description: description,
        status: "Ongoing",
        startTime: getTimer(startTime["$d"]),
        endTime: getTimer(endTime["$d"]),
        user: 0
    };;

    try {
        newTask.dateAdded = fixDateHandler("");

    } catch (error) {
            
        newTask.dateAdded = dateAdded;
    }

    await fetch("https://localhost:7136/api/usertasks/new",
    {
        method: "POST",
        body: JSON.stringify(newTask),
        mode: 'cors',
        withCredentials: true,
        credentials: 'same-origin',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Allow-Methods': '*',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
    })
    .then(response => response.json())
    .then(resJson => {
        if(resJson != undefined && resJson != null && resJson != {} && resJson != '') {
            const { responseObject, message } = resJson;
            // feedback
            onNewTaskAdded({ responseObject, message });
        }
    })
    .catch(error => {
            onNewTaskAdded({ responseObject: null, message:"oops something went wrong 😢" });
    });
   };

  const updateSelectedTaskRequest = async(token) => {   

    const updatedTask = {
        id: taskId,
        title: title,
        status: status,
        description: description,
        startTime: getTimer(startTime["$d"]),
        endTime: getTimer(endTime["$d"]),
    };  

    try {
        updatedTask.dateAdded = fixDateHandler("");

    } catch (error) {
            
        updatedTask.dateAdded = dateAdded;
    }

    await updateUserTaskRequest({ token, updatedTask, taskId })
    .then(res => {
        if(res != undefined && res != null && res != {} && res != '') {
            const { responseObject, message } = res;
            onUpdateTask({ responseObject, message });
        }
    }).catch(error => {
        onUpdateTask({ responseObject: null, message:"oops something went wrong 😢" });
    });
  }

  return (
    <Box>
        {(action == "new") && <Box sx={{ display: "flex" }}>
            <AddTaskIcon color="primary" sx={{ margin: ".5rem .2rem"}} />
            <Typography id="modal-modal-title" color="primary" sx={{ marginTop: ".3rem", marginLeft: ".3rem"}} variant="h6" component="h2">New Task</Typography>
        </Box>}
        {(action == "update") && <Box sx={{ display: "flex" }}>
            <EditIcon sx={{ margin: ".5rem .2rem", color: "#F87D01"}} />
            <Typography id="modal-modal-title" color="#F87D01" sx={{ marginTop: ".3rem", marginLeft: ".3rem"}} variant="h6" component="h2">Task Details</Typography>
        </Box>}
        <Divider />
        <form onSubmit={formSubmissionHandler}>
            <Stack>
            <input type="hidden" value={taskId} />
            <TextField required id="standard-basic" label="Title" sx={{ margin: ".5rem 0"}} variant="standard"
                inputProps={{ maxLength: 35 }} 
                value={title}
                onChange={(event) => { setTitle(event.target.value)}}
            />
            <Typography sx={{ color: "#333"}}>max characters (35)</Typography>
            <FormControl required sx={{ margin: "1rem 0" }}>
            <TextField
            id="outlined-multiline-flexible"
            label="Description"
            required
            multiline
            value={description}
            maxRows={7}
            onChange={(newValue) => setDescription(newValue.target.value)}
            />
            </FormControl>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                    label="Date *"
                    defaultValue={dayjs(dateAdded)}
                    onChange={(newValue) => {
                        setDateAdded(newValue);
                    }}
                    required
                    renderInput={(params) => <TextField {...params} />}
                    disablePast 
                />
            </LocalizationProvider>
            <Box sx={{ display: "flex", margin: "1rem 0" }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <MobileTimePicker label={'"Start"'} openTo="minutes" sx={{ marginRight: "1rem" }}
                        onChange={(newValue) => {
                            setStartTime(newValue);
                        }} 
                        defaultValue={dayjs(startTime)}
                        renderInput={(params) => <TextField {...params} />}
                        required
                        />
                </LocalizationProvider>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <MobileTimePicker label={'"End"'} openTo="minutes" 
                        onChange={(newValue) => {
                           setEndTime(newValue);
                        }}
                        defaultValue={dayjs(endTime)}
                        renderInput={(params) => <TextField {...params} />}
                        required
                        />
                </LocalizationProvider>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "right", marginTop: "1rem" }}>
                <Button variant="outlined" sx={{ margin: "0 1rem"}} onClick={onModalClose}>Cancel</Button>
                {(action == "new") && <Button variant="contained" type="submit" disabled={disableButton}>Add</Button>} 
                {(action == "update") && <Button variant="contained" type="submit" sx={{ background: "#F87D01"}}
                disabled={disableButton}>Update</Button>}
            </Box>        
            </Stack>
        </form>
    </Box>
  );
}
