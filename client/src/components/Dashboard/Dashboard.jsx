import React, { useState } from 'react'
import { Box, Grid, Typography, Modal, Link, Fab, Stack } from '@mui/material'
import TaskForm from '../UI/TaskForm';
import AddTaskIcon from '@mui/icons-material/AddTask';

const Dashboard = ({ user }) => {
      
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
     <>
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description">
            <Box>
                <TaskForm onModalClose={handleClose}/>
            </Box>
        </Modal>
        <Box sx={{ padding: "2rem" }}>
        <Box sx={{ background: "#fff", padding: "1rem", borderRadius: "1rem", display: "flex", justifyContent: "space-between"}}>
            <Box sx={{ padding: "1rem"}}>
                    <Typography sx={{ fontSize: "2rem"}}>Welcome - <span style={{ color: "#1976D2"}}>{user} </span> 😊</Typography>
                    <Typography sx={{ marginTop: "1rem", fontSize: "1.2rem"}}>Let's do something today</Typography>
            </Box>
            <Box>
            <Link onClick={handleOpen}>
                <Fab color="primary" aria-label="add">
                    <AddTaskIcon />
                </Fab>
            </Link>
            </Box>
        </Box>
        <Grid container sx={{ margin: "2rem 0"}}>
            <Grid item xs={7} sx={{ padding:"2rem", background: "#fff", height: "auto", margin: "0 1rem 0 0", borderRadius: "1rem"}}>
                <Typography sx={{ fontSize: "1.4rem", color: "#333"}}>
                    Upcoming Task
                </Typography>
                <Stack sx={{ margin: "1rem 0"}}>
                    <Box sx={{ padding: "1rem", margin: "1rem 0", background: "#346864", borderRadius: "1rem", display: "flex", justifyContent: "space-between"}}>
                        <Typography sx={{ fontSize: "1rem", color: "#fff", padding:"1rem"}}>Upcoming Task 1</Typography>
                        <Typography sx={{ background: "red", padding:"1rem", 
                        borderRadius: "1rem", fontSize: "1rem", color: "#fff", textAlign: "center"}}>Urgent</Typography>
                    </Box>
                </Stack>
            </Grid>
            <Grid item xs={4} sx={{ height: "500px", background: "#fff", margin: "0 0 0 4.2rem", borderRadius: "1rem"}}>
            
            </Grid>
        </Grid>
        </Box>
     </>
  )
}

export default Dashboard;