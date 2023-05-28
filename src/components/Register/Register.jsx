import React, { useState } from 'react'
import { Box, Typography, Button, Stack, Link } from "@mui/material"
import IconButton from '@mui/material/IconButton';
import LoginIcon from '@mui/icons-material/Login';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { userRegisterationHandler } from '@/pages/api/auth/userAuth';
import Toast from '../UI/Toast/Toast';

import LinearProgress from '@mui/material/LinearProgress';

export default function Register({ onUserAuthRequest }) {
  
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [sendingRequest, setSendingRequest] = useState("none");
  const [disableButton, setDisableButton] = useState(false);
  const [requestIsCompleted, setRequestIsCompleted] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");
  const [snackBarType, setSnackBarType] = useState("");

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const userRegisterHandler = async(event) => {
      event.preventDefault();
      setSendingRequest("block");
      setDisableButton(true);
      
      await userRegisterationHandler({ username, email, password })
      .then(response => {
        const { data } = response;

        setRequestIsCompleted(true);
        setSnackMessage(`${data.message} 😊`);
        setSnackBarType("success");

        setEmail("");
        setPassword("");
        setUsername("");

        // redirect 
        onUserAuthRequest(data);
    })
    .catch(error => {
        const { response } = error;

        setRequestIsCompleted(true);
        setSnackMessage(`${response.data.message} 😢`);
        setSnackBarType("error");
        setDisableButton(false);
    });
  
    setSendingRequest("none");
  };

  return (
    <Box sx={{ marginTop: "1rem"}}>
       <Box sx={{ display: "flex", flexDirection: "column"}}>
       <form style={{ display: "flex", flexDirection: "column" }} onSubmit={(event) => userRegisterHandler(event)}>
                    <Stack sx={{ margin:"1.2rem 0" }}>   
                    <Typography variant="h5" component="h2" color="#9E9EA7">Sign Up</Typography>
                    </Stack>
                    <TextField id="standard-basic" 
                            label="Username" 
                            variant="standard" 
                            required
                            onChange={(element) => { setUsername(element.target.value)}}
                            sx={{ margin: ".6rem 0", width: "100%"}}
                    />
                     <TextField id="standard-basic" 
                            label="Email" 
                            variant="standard" 
                            required
                            onChange={(element) => { setEmail(element.target.value)}}
                            sx={{ margin: ".5rem 0", width: "100%"}}
                    />
                   <FormControl variant="standard" sx={{ margin: ".6rem 0", width: "100%"}}>
                    <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                    <Input
                      id="standard-adornment-password"
                      required
                      onChange={(element) => { setPassword(element.target.value)}}
                      type={showPassword ? 'text' : 'password'}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                   </FormControl>
                    <Button type='submit' variant="contained" endIcon={<LoginIcon />} sx={{ margin: ".7rem 0", padding: ".5rem", borderRadius: "1rem", width: "200px" }}>Sign up</Button>
              </form>
              <LinearProgress sx={{ display: `${sendingRequest}`}}/>
              {requestIsCompleted && <Toast snackBarType={snackBarType} snackMessage={snackMessage} /> }
       </Box>
    </Box>
  )
}
