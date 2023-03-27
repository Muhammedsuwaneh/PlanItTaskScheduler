import React, { useState } from 'react'
import { Stack, TextField, FormControl, InputLabel, MenuItem, Box, Button, Typography, Divider } from "@mui/material";
import Select from '@mui/material/Select';
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

export default function TaskForm({ onModalClose }) {

  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [date, setDate] = useState();
  const [priority, setPriority] = useState("Urgent");

  const formSubmissionHandler = async (event) => {
    event.preventDefault();

    const token = getCookie("USER_AUTH_TOKEN");
    
    const fullDate =  date['$d'].toDateString().split(" ");
    const day = fullDate[1];
    const month = fullDate[2];
    const year = fullDate[3];
    const newDate = `${day} ${month} ${year}`;

    const newTask = { 
        title: title,
        description: description,
        dateAdded: newDate,
        priority: priority,
        user: 0
    };

    console.log(newTask);

    /*const response = await fetch("https://localhost:7136/api/usertasks/new",
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
    console.log(resJson);*/
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
                inputProps={{ maxLength: 12 }} 
                onChange={(event) => { setTitle(event.target.value)}}
            />
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
            <FormControl sx={{ margin: "1.3 0"}}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                    label="Date"
                    value={date}
                    onChange={(newValue) => setDate(newValue)}
                    />
                </LocalizationProvider>
            </FormControl>
            <FormControl required sx={{ margin: "1.3rem 0" }}>
            <InputLabel id="demo-simple-select-required-label">Priority</InputLabel>
            <Select
                labelId="demo-simple-select-required-label"
                id="demo-simple-select-required"
                value={priority}
                onChange={(event) => { setPriority(event.target.value)}}
                label="Priority"
            >
                <MenuItem value={"Urgent"}>Urgent</MenuItem>
                <MenuItem value={"Important"}>Important</MenuItem>
                <MenuItem value={"Less Important"}>Less Important</MenuItem>
            </Select>
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
