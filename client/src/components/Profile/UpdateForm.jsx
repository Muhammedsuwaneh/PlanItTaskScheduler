import React, { useState } from 'react';
import { Stack,Typography, Box, Button } from "@mui/material";
import Input from '@mui/material/Input';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import LinearProgress from '@mui/material/LinearProgress';

import { updateUserInfoRequest } from '@/pages/api/auth/userAuth';
import { getCookie, deleteCookie, setCookie } from 'cookies-next';

export default function UpdateForm({ onUserProfileUpdate, userInfo }) {

  const [showPassword, setShowPassword] = useState(false);    
  
  const [userId, setUserId] = useState(userInfo.id);
  const [userEmail, setUserEmail] = useState(userInfo.email);
  const [username, setUsername] = useState(userInfo.username);
  const [password, setPassword] = useState(userInfo.password);
  const [dateJoined, setDateJoined] = useState(userInfo.dateJoined);
  const [disableButton, setDisableButton] = useState(false);
  const [sendingRequest, setSendingRequest] = useState("none");
  
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  
  const userRegisterHandler = (event) => {
      event.preventDefault();  
      setDisableButton(true);
      setSendingRequest("block");

      const token = getCookie("USER_AUTH_TOKEN");
      const updatedUser = {
        id: userId,
        email: userEmail,
        username: username,
        password: password,
        dateJoined: dateJoined,
      };

      updateUserInfoRequest({ updatedUser, token})
      .then(res => {
            if(res != null && res != "" && res != undefined) {
                console.log("updated");
                const { responseObject } = res;
                console.log(responseObject);
                onUserProfileUpdate(true);
                deleteCookie("USER_AUTH_USERNAME");
                setCookie("USER_AUTH_USERNAME", username)
            }
            else {
                onUserProfileUpdate(false);
            }
            setSendingRequest("none");
            setDisableButton(false);
       })
       .catch(error => {
          onUserProfileUpdate(false);
          setDisableButton(false);
          setSendingRequest("none");
       });
  };

  const restoredChangesHandler = () => {
    setUserEmail(userInfo.email);
    setUsername(userInfo.username);
    setPassword(userInfo.password);
  };

  return (
    <>
      <form style={{ display: "flex", flexDirection: "column", marginTop: "1rem", justifyContent: "center", margin: "auto" }} onSubmit={(event) => userRegisterHandler(event)}>
        <TextField id="standard-basic" 
                label="Username" 
                variant="standard" 
                required
                value={username}
                onChange={(element) => { setUsername(element.target.value)}}
                sx={{ margin: ".6rem 0", width: "auto"}}
        />
        <TextField id="standard-basic" 
                label="Email" 
                variant="standard" 
                required
                value={userEmail}
                onChange={(element) => { setUserEmail(element.target.value)}}
                sx={{ margin: ".5rem 0", width: "auto"}}
        />
      <FormControl variant="standard" sx={{ margin: ".6rem 0", width: "auto"}}>
        <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
        <Input
          id="standard-adornment-password"
          required
          value={password}
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
        <Box sx={{ display: "flex", marginTop: "1rem", justifyContent: "right" }}>
            <Button variant="contained" onClick={restoredChangesHandler}
            sx={{ margin: "1rem 5px", borderRadius: ".5rem", background: "#333"}} disabled={disableButton}>
                Discard
            </Button>
            <Button type='submit' variant="contained" 
            sx={{ margin: "1rem 0", borderRadius: ".5rem", background: "#F87D01"}} disabled={disableButton}>
                Save Changes
            </Button>
        </Box>
      </form>
      <LinearProgress sx={{ display: `${sendingRequest}`}}/>
    </>
  )
}
