import React, { useState } from 'react'
import { Stack, TextField, FormControl, InputLabel, MenuItem, Box, Button, Typography, Divider } from "@mui/material";
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import AddTaskIcon from '@mui/icons-material/AddTask';
import EditIcon from '@mui/icons-material/Edit';

import { getCookie } from "cookies-next";

import { updateUserTaskRequest } from '@/pages/api/userTaskApi';

const style = {
    position: 'absolute',
    top: '30%',
    left: '50%',
    transform: 'translate(-50%, -30%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: "1rem",
};

export default function TaskForm({ onModalClose, onNewTaskAdded, onUpdateTask, itemObject, action } ) {

  const [taskId, setTaskId] = useState(itemObject.id);
  const [title, setTitle] = useState(itemObject.title);
  const [description, setDescription] = useState(itemObject.description);
  const [status, setStatus] = useState(itemObject.status);
  const [dateAdded, setDateAdded] = useState(itemObject.dateAdded);
  const [disableButton, setDisableButton] = useState(false);

  const formSubmissionHandler = async (event) => {
    event.preventDefault();
    const token = getCookie("USER_AUTH_TOKEN");
    setDisableButton(true);

    if(action == "new") {
        const newTask = { 
            title: title,
            description: description,
            dateAdded: "date",
            status: "status",
            user: 0
        };
    
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
    }

    else if(action == "update") {

        // send a update request
        const updatedTask = {
            id: taskId,
            title: title,
            status: status,
            description: description,
            dateAdded: dateAdded,
        };  

        updateUserTaskRequest({ token, updatedTask, taskId })
        .then(res => {
            if(res != undefined && res != null && res != {} && res != '') {
                const { responseObject, message } = res;
                onUpdateTask({ responseObject, message });
            }
        }).catch(error => {
            onUpdateTask({ responseObject: null, message:"oops something went wrong 😢" });
        });
    }

  };

  return (
    <Box sx={style}>
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
