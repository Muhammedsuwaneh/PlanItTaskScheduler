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

import { updateUserTaskRequest, getBaseURL } from '@/pages/api/userTaskApi';

  
export default function TaskForm({ onModalClose, onNewTaskAdded, onUpdateTask, itemObject, action } ) {
  
  const getTodaysDay = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
  };

  const [taskId, setTaskId] = useState(itemObject.id);
  const [title, setTitle] = useState(itemObject.title);
  const [description, setDescription] = useState(itemObject.description);
  const [status, setStatus] = useState(itemObject.status);
  const [startTime, setStartTime] = useState(
    itemObject.startTime !== ""
      ? dayjs(getTodaysDay(new Date()) + "T" + itemObject.startTime) : 
      dayjs()
  );
  const [endTime, setEndTime] = useState(
    itemObject.endTime !== ""
      ? dayjs(getTodaysDay(new Date()) + "T" + itemObject.endTime) : 
      dayjs()
  );
  const [dateAdded, setDateAdded] = useState((itemObject.dateAdded != "") ? itemObject.dateAdded : getTodaysDay(new Date()));
  const [disableButton, setDisableButton] = useState(false);

  const formatTimeHandler = (timer) => {
    let minutes = "";
    timer.getMinutes() < 10
      ? (minutes = "0" + timer.getMinutes())
      : (minutes = timer.getMinutes());
    return timer.getHours() + ":" + minutes;
  };

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
        startTime: formatTimeHandler(startTime["$d"]),
        endTime: formatTimeHandler(endTime["$d"]),
        user: 0
    };

    try {
        newTask.dateAdded = fixDateHandler("");

    } catch (error) {
            
        newTask.dateAdded = dateAdded;
    }

    await fetch(`${getBaseURL()}/usertasks/new`,
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
        const { responseObject } = resJson;
        // feedback
        onNewTaskAdded(responseObject, true);
    })
    .catch(error => {
            onNewTaskAdded(null, false);
    });
   };

  const updateSelectedTaskRequest = async(token) => {   

    const updatedTask = {
        id: taskId,
        title: title,
        status: status,
        description: description,
        startTime: formatTimeHandler(startTime["$d"]),
        endTime: formatTimeHandler(endTime["$d"]),
    };  

    console.log(updatedTask);

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
                    <TimePicker
                        label="Start Time"
                        defaultValue={dayjs(startTime)}
                        onChange={(newValue) => setStartTime(newValue)}
                        />
                </LocalizationProvider>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <TimePicker
                        label="End Time"
                        defaultValue={dayjs(endTime)}
                        onChange={(newValue) => setEndTime(newValue)}
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
