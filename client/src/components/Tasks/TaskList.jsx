import React from 'react'
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import { Box, Grid, Typography, Modal, Link, Fab, Stack, TextField } from '@mui/material'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import { getCookie } from "cookies-next";

import { deleteUserTaskRequest } from '@/pages/api/userTaskApi';

import DeleteContent from '../UI/DeleteContent/DeleteContent';
import TaskForm from '../UI/TaskForm/TaskForm';
import MarkAsCompleted from '../UI/MarkAsComplete/MarkAsCompleted';
import TaskListContent from './TaskListContent';


import ModalContent from '../UI/Modal/ModalContent';

export const getTaskStatusColor = (status) => {
    switch(status) {
        case "Ongoing": 
            return "#F87D01";
        case "Completed":
            return "#1976D2";
    }
  };

export const getTaskIconHandler = (status) => {
    switch(status) {
        case "Ongoing": 
            return <HourglassBottomIcon />;
        case "Completed":
            return <TaskAltIcon />;
    }
};

export default function TaskList({ userTasks, currentPage, onDeleteSuccessful, onTaskUpdate }) {

  const [status, setStatus] = React.useState('All');
  const [tasksList, setTaskList] = React.useState(userTasks);
  const [open, setOpen] = React.useState(false);
  const [newHeight, setNewHeight] = React.useState("400px");
  const [modalContent, setModalContent] = React.useState();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const token = getCookie("USER_AUTH_TOKEN");

  const handleChangeFilter = (event, action) => {
     if(action == "filter") {
        setStatus(event.target.value);

        if(event.target.value == "All") {
            setTaskList(userTasks);
        }
        else {
            const newtaskList = userTasks.filter((task) => task.status == event.target.value);
            setTaskList(newtaskList);
        }
     }
     else if(action == "search") {
        const filterStrTrimmed = event.target.value.trim().toLowerCase();
        if(filterStrTrimmed == " " || filterStrTrimmed == null || filterStrTrimmed == undefined) 
            setTaskList(userTasks);
        else {
            const items2Display = userTasks.filter((item)=>{
                if (filterStrTrimmed == "") return true;
                else if (item.title.toLowerCase().indexOf(filterStrTrimmed) >= 0) return true;
                else return false;
            });
            setTaskList(items2Display);
        }
     }
  };

  const deleteTaskHandler = async (id) => {
    if(id != "" && id != 0 && id != null && id != undefined) {
        // send a delete request
        await deleteUserTaskRequest({ token, id })
        .then(res => {
            const { responseObject } = res;
            if(responseObject != null && responseObject != undefined && responseObject != "") {
                // remove task from list
                const newTasks = userTasks.filter((task) => task.id !== id);
                setTaskList(newTasks);
                let listIsEmpty = false; 
                if(newTasks.length <= 0) listIsEmpty = true;
                onDeleteSuccessful(listIsEmpty, true);
            }
        })
        .catch(error => {
            onDeleteSuccessful(true, false);
        });

        handleClose();
    }
  };

  const updateTaskHandler = ({ responseObject }) => {
    if(responseObject != null) {
        const newTaskList = tasksList.map(task => {
            if(task.id == responseObject.id) {
                task = responseObject;
            }
            return task;
        });
        setTaskList(newTaskList);
        onTaskUpdate(true);
    }
    else {
        onTaskUpdate(false);
    }
    handleClose();
  };

  const markTaskAsCompletedHandler  = async (id) => {
    const req = await fetch(`https://localhost:7136/api/usertasks/marktaskascomplete/${+id}`,
    {
        method: "PUT",
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
  };

  const actionButtonHandler = (action, itemObject) => {
    // modal content based on action
    if(action == "delete") {
        setModalContent(<DeleteContent onConfirmDelete={() => deleteTaskHandler(itemObject.id)} noDelete={handleClose}/>);
        setNewHeight("200px");
    }

    else if(action == "update") {
        setModalContent(<TaskForm itemObject={itemObject} onUpdateTask={updateTaskHandler} onModalClose={handleClose} action="update"/>)
        setNewHeight("auto");
    }

    else if(action == "mark") {
        setModalContent(<MarkAsCompleted onMarkConfirmed={() => markTaskAsCompletedHandler(itemObject.id)} noAction={handleClose} />);
        setNewHeight("200px");
    }

    // open modal 
    handleOpen();
  };

  return (
    <>
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <ModalContent height={newHeight}>
               {modalContent}
            </ModalContent>
        </Modal>
        {(currentPage == "dashboard") || <Box>
            <Box sx={{ display: { lg: "flex", xs: "column", md: "flex", sm: "flex"}, justifyContent: "space-between" }}>
                <Box sx={{ display: "flex", alignItems: "center"}}>
                    <Typography sx={{ margin: "0 1rem"}}>Filter:</Typography>
                    <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Status</InputLabel>
                    <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={status}
                    label="Status"
                    onChange={(event) => handleChangeFilter(event, "filter")}
                    sx={{ width: 150 }}
                    >
                    <MenuItem value="All">All</MenuItem>
                    <MenuItem value="Ongoing">Ongoing</MenuItem>
                    <MenuItem value="Completed">Completed</MenuItem>
                    </Select>
                </FormControl>
                </Box>
                <Box>
                <TextField
                    id="standard-search"
                    label="Search"
                    type="search"
                    variant="standard"
                    onChange={(event) => handleChangeFilter(event, "search")}
                    />
                </Box>
            </Box>
        </Box>}
        <Box>
           <TaskListContent onActionFired={actionButtonHandler} tasksList={tasksList} page={currentPage}/>
        </Box>
    </>
  )
}
