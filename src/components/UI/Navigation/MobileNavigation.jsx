import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';

import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Grid, styled, Stack, Typography, Divider } from '@mui/material';

const NavigationTheme = styled(Grid)(({ theme }) => ({
    background: "#131313",
    width: "100%",
    padding: "1rem",
    color: "#00",
}));

const drawerWidth = 240;
const navItems = ['Dashboard', 'Tasks', 'Calender', 'Profile'];

function MobileNavigation({ onLogoutClick, window }) {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center', height: "inherit", background: "#131313" }}>
      <Divider />
      <Stack sx={{ marginTop: "1.3rem"}}>
        {navItems.map(link => {
            return (
                <Link href={`/${link.toLowerCase()}`} underline="none" key={link} 
                sx={{ padding: "0 1rem", color: "#fff", margin: "1.2rem 0", '&:hover': { color: "#1871CD"}}}>
                    {link}
                </Link>
            )   
          })}
          <Link sx={{textDecoration: "none", color: "red", cursor: "pointer" }} onClick={() => onLogoutClick()}>
              Logout
          </Link>
      </Stack>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: {  sm: 'flex', md: 'flex', xs: 'flex', lg: 'none'}}}>
      <CssBaseline />
      <AppBar component="nav">
        <NavigationTheme container>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { lg: 'none', sm: 'block', md: 'block', xs: 'block' }, margin: "0 1rem" }}
          >
          <MenuIcon />
          </IconButton>
          <Grid item xs={9}>
                <Typography variant="h5" sx={{ color: "#fff", fontWeight: "bold", textAlign: "right"}}>
                    PLAN<span style={{ color: "#1976D2", borderBottom: "1px solid #1976D2", paddingBottom: ".5rem" }}>IT</span> 
                </Typography>
          </Grid>
        </NavigationTheme>
      </AppBar>
      <Box component="nav" sx={{marginBottom: "5rem"}}>
        <Drawer 
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'block', md: 'block', lg: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}

MobileNavigation.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default MobileNavigation;