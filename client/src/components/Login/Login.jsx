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
import CircularProgress from '@mui/material/CircularProgress';
import LinearProgress from '@mui/material/LinearProgress';

import { userAuthenticationHandler } from '@/pages/api/auth/userAuth';

export default function Login({ onUserAuthRequest }) {
  
  const [showPassword, setShowPassword] = useState(false);
  const [sendingRequest, setSendingRequest] = useState("none");

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const [email, setEmail] = useState("defaultuser8596@gmail.com");
  const [password, setPassword] = useState("Passw0rd!!");

  const userAuthHandler = async (event) => {
      
      event.preventDefault();
      setSendingRequest("block");

      const responseData = await userAuthenticationHandler({ email, password });
      
      setSendingRequest("none");

      onUserAuthRequest({ responseData });
  };

  return (
    <Box sx={{ marginTop: "2rem"}}>
       <form style={{ display: "flex", flexDirection: "column" }} onSubmit={(event) => userAuthHandler(event)}>
                    <Stack sx={{ margin:"2rem 0" }}>   
                    <Typography variant="h5" component="h2" color="#9E9EA7">Sign In</Typography>
                    </Stack>
                    <TextField id="standard-basic" 
                            label="Email" 
                            variant="standard" 
                            required
                            defaultValue={"defaultuser8596@gmail.com"}
                            onChange={(element) => { setEmail(element.target.value)}}
                            sx={{ margin: "1rem 0", width: "400px"}}
                    />
                    <FormControl variant="standard" sx={{ width: "400px"}}>
                    <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                    <Input
                      id="standard-adornment-password"
                      defaultValue={"Passw0rd!!"}
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
                   <Button type='submit' variant="contained" endIcon={<LoginIcon />} sx={{ margin: "2rem 0", padding: ".5rem", borderRadius: "1rem", width: "200px" }}>Sign in</Button>
              </form>
              <LinearProgress sx={{ display: `${sendingRequest}`}}/>
       </Box>
  )
}
