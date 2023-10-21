import React, { useState, useEffect } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Link from '@mui/material/Link';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ListAltIcon from '@mui/icons-material/ListAlt';
import LogoutIcon from '@mui/icons-material/Logout';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MobileNavigation from './MobileNavigation';

import Box from '@mui/material/Box';
import { styled } from "@mui/material/styles";

import { getCookie, deleteCookie } from 'cookies-next';
import { useRouter } from 'next/router';
import { Typography } from '@mui/material';

const SideBarTheme = styled(Box)(({ theme }) => ({
  backgroundColor: '#131313',
  color:"#fff",
  padding: "1rem 3rem",
  textAlign: 'center',
  height:"100%",
  width: "300px",
  display:"flex",
  flexDirection: "column",
  justifyContent: "center",
  color: theme.palette.text.secondary,
  position: "fixed",
  top: "0",
  left: "0",
}));

export default function SideBar() {

  const router = useRouter();
  const [currentPage, setCurrentPage] = useState("");

  const logoutHandler = () => {

      deleteCookie("USER_AUTH_TOKEN");
      deleteCookie("USER_AUTH_USERNAME");

      router.push("/");
  };


  useEffect(() => {
    const currentPageUrlTemp = (window.location.pathname).split("/")[1];
    setCurrentPage(currentPageUrlTemp);
  }, []);

  return (
    <>
        <MobileNavigation onLogoutClick={logoutHandler}/>
        <SideBarTheme sx={{ display: { xs: "none", sm: "none", md: "none", lg: "block"}}}>
        <Typography variant="h5" sx={{ color: "#fff", fontWeight: "bold", margin: "2rem 1rem", textAlign: "center"}}>
            PLAN<span style={{ color: "#1976D2", borderBottom: "1px solid #1976D2", paddingBottom: ".5rem" }}>IT</span> 
        </Typography>
        <ListItem disablePadding sx={{'&:hover': { background: "#1976D2"}, transition: ".5s ease background", 
      background: `${(currentPage === "dashboard") ? "#1976D2" : ""}`, margin: "5px 0"}}>
          <ListItemButton>
            <ListItemIcon>
              <DashboardIcon sx={{ color: "#fff"}}/>
            </ListItemIcon>
              <Link href={`/dashboard`} sx={{ textDecoration: "none", color: "#fff", margin: "1.2rem 0" }}>
                  Dashboard
              </Link>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding sx={{'&:hover': { background: "#1976D2"}, transition: ".5s ease background",
       background: `${(currentPage === "tasks") ? "#1976D2" : ""}`, margin: "5px 0"}}>
          <ListItemButton>
            <ListItemIcon>
              <ListAltIcon sx={{ color: "#fff"}}/>
            </ListItemIcon>
              <Link href={`/tasks`} sx={{ textDecoration: "none", color: "#fff", margin: "1.2rem 0" }}>
                  Tasks
              </Link>
          </ListItemButton>
      </ListItem>
      <ListItem disablePadding sx={{'&:hover': { background: "#1976D2", transition: ".5s ease background"},
     background: `${(currentPage === "calender") ? "#1976D2" : ""}`, margin: "5px 0"}}>
          <ListItemButton>
            <ListItemIcon>
              <CalendarMonthIcon sx={{ color: "#fff"}}/>
            </ListItemIcon>
              <Link href={`/calender`} sx={{ textDecoration: "none", color: "#fff", margin: "1.2rem 0" }}>
                  Calender
              </Link>
          </ListItemButton>
      </ListItem>
      <ListItem disablePadding sx={{'&:hover': { background: "#1976D2", transition: ".5s ease background"},
     background: `${(currentPage === "profile") ? "#1976D2" : ""}`, margin: "5px 0"}}>
          <ListItemButton>
            <ListItemIcon>
              <AccountCircleIcon sx={{ color: "#fff"}}/>
            </ListItemIcon>
              <Link href={`/profile`} sx={{ textDecoration: "none", color: "#fff", margin: "1.2rem 0" }}>
                  Profile
              </Link>
          </ListItemButton>
        </ListItem>
      <List sx={{ marginTop: "80%" }}>
        <ListItem disablePadding onClick={logoutHandler} sx={{ marginTop: "1rem", '&:hover': { opacity: ".9"}, transition: ".5s ease background"}}>
          <ListItemButton>
            <ListItemIcon>
              <LogoutIcon sx={{ color: "red" }} />
            </ListItemIcon>
              <Link sx={{textDecoration: "none", color: "red" }}>
                  Logout
              </Link>
          </ListItemButton>
        </ListItem>
        </List>
        </SideBarTheme>
    </>
  )
}
