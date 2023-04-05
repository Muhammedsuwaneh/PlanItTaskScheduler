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

export default function UpdateForm({ onUserProfileUpdate, userInfo }) {

  const [showPassword, setShowPassword] = useState(false);    
  
  const [userEmail, setUserEmail] = useState(userInfo.email);
  const [username, setUsername] = useState(userInfo.username);
  const [password, setPassword] = useState(userInfo.password);
  
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  
  const userRegisterHandler = (event) => {
      event.preventDefault();  

      // onUserProfileUpdate({ response })
  };

  return (
    <form style={{ display: "flex", flexDirection: "column", marginTop: "3rem" }} onSubmit={(event) => userRegisterHandler(event)}>
    <TextField id="standard-basic" 
            label="Username" 
            variant="standard" 
            required
            value={username}
            onChange={(element) => { setUsername(element.target.value)}}
            sx={{ margin: ".6rem 0", width: "400px"}}
    />
     <TextField id="standard-basic" 
            label="Email" 
            variant="standard" 
            required
            value={userEmail}
            onChange={(element) => { setUserEmail(element.target.value)}}
            sx={{ margin: ".5rem 0", width: "400px"}}
    />
   <FormControl variant="standard" sx={{ margin: ".6rem 0", width: "400px"}}>
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
    <Box sx={{ display: "flex", marginTop: "5rem", justifyContent: "right" }}>
        <Button type='submit' variant="contained" 
        sx={{ margin: "0 0 1rem 0", borderRadius: ".5rem", background: "red"}}>
            Discard
        </Button>
        <Button type='submit' variant="contained" 
        sx={{ margin: "0 3rem 1rem 1rem", borderRadius: ".5rem", background: "#F87D01"}}>
            Save Changes
        </Button>
    </Box>
</form>
  )
}
