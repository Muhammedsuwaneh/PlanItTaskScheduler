import React, { useState } from 'react'
import { Stack, TextField, FormControl, InputLabel, MenuItem, Box, Button, Typography, Divider } from "@mui/material";
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import AddTaskIcon from '@mui/icons-material/AddTask';

import { getCookie } from "cookies-next";


import axios from "axios";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: "1rem",
};

export default function TaskForm({ onModalClose, onNewTaskAdd }) {

  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [date, setDate] = useState();

  const formSubmissionHandler = async (event) => {
    event.preventDefault();

    const token = getCookie("USER_AUTH_TOKEN");

    const newTask = { 
        title: title,
        description: description,
        dateAdded: "date",
        status: "status",
        user: 0
    };

    const response = await fetch("https://localhost:7136/api/usertasks/new",
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
    });

    const resJson = response.json();

    resJson.then(res => {
        if(res != undefined && res != null && res != {} && res != '') {
            const { responseObject } = res;
            onNewTaskAdd({ responseObject });
        }
    });

  };

  return (
    <Box sx={style}>
        <Box sx={{ display: "flex" }}>
            <AddTaskIcon color="primary" sx={{ margin: ".5rem"}} />
            <Typography id="modal-modal-title" color="primary" sx={{ marginTop: ".3rem", marginLeft: "1rem"}} variant="h6" component="h2">New Task</Typography>
        </Box>
        <Divider />
        <form onSubmit={formSubmissionHandler}>
            <Stack>
            <TextField required id="standard-basic" label="Title" sx={{ margin: ".5rem 0"}} variant="standard"
                inputProps={{ maxLength: 35 }} 
                onChange={(event) => { setTitle(event.target.value)}}
            />
            <Typography sx={{ color: "#333"}}>max characters (35)</Typography>
            <FormControl required sx={{ margin: "1rem 0" }}>
            <TextField
            id="outlined-multiline-flexible"
            label="Description"
            required
            multiline
            maxRows={4}
            onChange={(newValue) => setDescription(newValue.target.value)}
            />
            </FormControl>
            <Box sx={{ display: "flex", justifyContent: "right", marginTop: "1rem" }}>
                <Button variant="outlined" sx={{ margin: "0 1rem"}} onClick={onModalClose}>Cancel</Button>
                <Button variant="contained" type="submit">Add</Button>  
            </Box>        
            </Stack>
        </form>
    </Box>
  );
}
