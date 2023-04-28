import React, { useState, useEffect } from 'react'
import Login from '../Login/Login'
import Register from '../Register/Register'
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { Grid, Box, Typography, styled, Divider, Button } from "@mui/material";

const UserAuthContainer = styled(Grid)(() => ({
    height: "100vh",
    background: "#E9EDF2",
    margin: "auto",
    padding: "2rem",
    justifyContent: "center",
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
    <UserAuthContainer container>
        <Box  sx={{ backgroundImage: `url("/task.jpg")`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center',
            height: "100%", width: "30%", borderTopLeftRadius: "2rem", boxShadow: "1px 1px 2px #333", borderBottomLeftRadius: "2rem" }}>
        </Box>
        <Box sx={{ background: "#fff", height: "100%", width: "50%", padding: "3rem", boxShadow: "1px 1px 2px #333", borderRadius: "0 1rem 1rem 0"}}>
            <Typography variant="h5" sx={{ fontWeight: "bold", margin: "2rem 1rem", textAlign: "center"}}>
                PLAN<span style={{ color: "#1976D2", borderBottom: "1px solid #1976D2", paddingBottom: ".5rem" }}>IT</span> 
            </Typography>
            <Typography variant="p">
              Manage your daily, weekly or monthly task in a user-friendly interface
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
              <Register onUserRegisterationRequest={UserAuthRequestHandler} />
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
