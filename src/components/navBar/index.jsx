import React, { useState } from 'react'
import { Drawer, List, ListItem, ListItemText, ListItemIcon, Toolbar, Typography, Box, IconButton, Grid } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import ListAltIcon from '@mui/icons-material/ListAlt';
import MenuIcon from '@mui/icons-material/Menu'
import AppBar from '@mui/material/AppBar';
import { Outlet, Link } from 'react-router-dom';

const drawerWidth = 240;

const NavBar = () => {

  const [openDrawer, setOpenDrawer] = useState(false);

  const handleDrawerOpen = () => {
    console.log(openDrawer)
    setOpenDrawer(!openDrawer);
  }

  return (
      <Box> 
          <AppBar position="fixed" sx={{ width: openDrawer? `calc(100% - ${drawerWidth}px)` : '100%' , background: '#96C9F4'}}>
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerOpen}
                sx={{color: '#0F67B1'}}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" noWrap component="div" sx={{color:'#0F67B1'}}>
                To Do App
              </Typography>
            </Toolbar>
          </AppBar>
          <Grid sx={{ paddingLeft: openDrawer? `calc(20px + ${drawerWidth}px)` : '20px', paddingTop: '100px', paddingRight: '100px', background:'#EEEEEE'}}><Outlet /></Grid>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
              background: '#3FA2F6',
            },
          }}
          variant="temporary"
          anchor="left"
          open={openDrawer}
          onClick={handleDrawerOpen}
        >
        
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 , color:'#D6EFD8'}}>
              MyApp
            </Typography>
          </Toolbar>
          <List>
            <ListItem button component={Link} to="/home" sx={{}}>
              <ListItemIcon>
                <HomeIcon sx={{color:'#D6EFD8'}}/>
              </ListItemIcon>
              <ListItemText sx={{color:'#D6EFD8'}} primary="Home" />
            </ListItem>
            <ListItem button component={Link} to="about">
              <ListItemIcon>
                <InfoIcon sx={{color:'#D6EFD8'}}/>
              </ListItemIcon>
              <ListItemText sx={{color:'#D6EFD8'}} primary="About" />
            </ListItem>
            <ListItem button component={Link} to="todo">
              <ListItemIcon>
                <ListAltIcon sx={{color:'#D6EFD8'}}/>
              </ListItemIcon>
              <ListItemText sx={{color:'#D6EFD8'}} primary="Todo App" />
            </ListItem>
          </List>
        </Drawer>
      </Box>
  )
}

export default NavBar