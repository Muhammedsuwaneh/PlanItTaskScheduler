import React, { useState, useEffect } from 'react'
import Login from '../Login/Login'
import Register from '../Register/Register'
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { Grid, Box, Typography, styled, Divider, Button } from "@mui/material";

const UserAuthContainer = styled(Grid)(() => ({
    height: "100vh",
    background: "#E9EDF2",
}));

export default function Main({ onUserAuthRequestMain}) {
 
  const [hideLoginPage, setHideLoginPage] = useState("block");
  const [displayError, setDisplayError] = useState("none");
  const [errorType, setErrorType] = useState("none");
  const [hideRegisterPage, setHideRegisterPage] = useState("none");

  const hideLoginPageHandler = () => {
    setHideLoginPage("none");
    setHideRegisterPage("block");
  };
  
  const hideRegisterPageHandler = () => {
    setHideLoginPage("block");
    setHideRegisterPage("none");
  };

  const UserAuthRequestHandler = (responseData) => {
      onUserAuthRequestMain(responseData);
  };

  return (
    <UserAuthContainer container sx={{ display: { md: 'column', sm: 'column', xs: 'column', lg: 'row'}}}>
        <Box sx={{ backgroundImage: `url("/task.jpg")`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center',
            height: { lg: "100%", sm: "50%", md: "50%", xs: "50%"}, width: { md: '100%', sm: '100%', xs: '100%', lg: '60%'}, boxShadow: "1px 1px 2px #333" }}>
        </Box>
        <Box sx={{ background: "#fff", height: "auto", width: { md: '100%', sm: '100%', xs: '100%', lg: '40%'}, padding: "3rem", boxShadow: "1px 1px 2px #333"}}>
            <Typography variant="h5" sx={{ fontWeight: "bold", margin: "2rem 1rem", textAlign: "center"}}>
                PLAN<span style={{ color: "#1976D2", borderBottom: "1px solid #1976D2", paddingBottom: ".5rem" }}>IT</span> Scheduler
            </Typography>
            <Typography variant="p" textAlign="center">
              Schedule your daily, weekly or monthly task in a user-friendly interface
            </Typography>
            <Box sx={{ display: `${hideLoginPage}`}}>
                <Login onUserAuthRequest={UserAuthRequestHandler}/>
                 <Box>
                  <Typography sx={{marginTop: ".5rem"}}>
                  Don't have an account ?  <Button variant="text" onClick={hideLoginPageHandler}>Sign Up Now !</Button>
                  </Typography>
                </Box>
            </Box>
            <Alert severity="error" sx={{ display:`${displayError}` }}>
                <AlertTitle>Error</AlertTitle>
                 {errorType}
            </Alert>
            <Box sx={{ display: `${hideRegisterPage}`}}>
              <Register onUserAuthRequest={UserAuthRequestHandler} />
                  <Box>
                  <Typography sx={{marginTop: ".5rem"}}>
                    Already have an account ?  <Button variant="text" onClick={hideRegisterPageHandler}>Sign in !</Button>
                  </Typography>
                </Box>
            </Box>
        </Box>
    </UserAuthContainer>
  )
}
