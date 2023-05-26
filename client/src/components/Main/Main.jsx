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
    <UserAuthContainer container sx={{ display: { md: 'column', sm: 'column', xs: 'column', lg: 'row'}, 
    padding: { lg: "3rem", sm: "1rem", md: "1rem", xs: "1rem"} }}>
        <Box sx={{ backgroundImage: `url("/task.jpg")`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center',
            height: { lg: "100%", sm: "50%", md: "50%", xs: "50%"}, width: { md: '100%', sm: '100%', xs: '100%', lg: '30%'}, 
            borderTopLeftRadius: { md: '0', sm: '0', xs: '0', lg: '2rem'}, 
            boxShadow: "1px 1px 2px #333", borderBottomLeftRadius: { lg: "2rem", sm: "0", md: "0", xs: "0"} }}>
        </Box>
        <Box sx={{ background: "#fff", height: "auto", width: { md: '100%', sm: '100%', xs: '100%', lg: '50%'}, padding: "3rem", boxShadow: "1px 1px 2px #333", 
        borderRadius: { lg: "0 1rem 1rem 0", sm: "0", xs: "0", md: "0"} }}>
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
