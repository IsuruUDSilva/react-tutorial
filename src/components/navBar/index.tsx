import React, { useState } from 'react'
import { Drawer, List, ListItem, ListItemText, ListItemIcon, Toolbar, Typography, Box, IconButton, Grid, Avatar } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import ListAltIcon from '@mui/icons-material/ListAlt';
import MenuIcon from '@mui/icons-material/Menu'
import AppBar from '@mui/material/AppBar';
import { Outlet, Link } from 'react-router-dom';
import img from '../../assets/todoAppImg.jpg'

const drawerWidth = 240;

const NavBar = () => {

  const [openDrawer, setOpenDrawer] = useState(false);

  const handleDrawerOpen = () => {
    console.log(openDrawer)
    setOpenDrawer(!openDrawer);
  }

  return (
      <Box> 
          <AppBar position="fixed" sx={{ width: openDrawer? `calc(100% - ${drawerWidth}px)` : '100%' , background: '#f0f0f0'}}>
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
              {!openDrawer && <Avatar alt='todo app' src={img} sx={{ width: 56, height: 56 }} />}
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
              background: '#F1EAFF',
            },
          }}
          variant="temporary"
          anchor="left"
          open={openDrawer}
          onClick={handleDrawerOpen}
        >
        
          <Toolbar>
          <Avatar alt='todo app' src={img} sx={{ width: 56, height: 56 }} />
            <Typography variant="h6" sx={{ flexGrow: 1 , color:'#404258', paddingLeft: '5px'}}>
              My ToDo App
            </Typography>
          </Toolbar>
          <List>
            <ListItem button component={Link} to="/home" sx={{}}>
              <ListItemIcon>
                <HomeIcon sx={{color:'#404258'}}/>
              </ListItemIcon>
              <ListItemText sx={{color:'#404258'}} primary="Home" />
            </ListItem>
            <ListItem button component={Link} to="about">
              <ListItemIcon>
                <InfoIcon sx={{color:'#404258'}}/>
              </ListItemIcon>
              <ListItemText sx={{color:'#404258'}} primary="About" />
            </ListItem>
            <ListItem button component={Link} to="todo">
              <ListItemIcon>
                <ListAltIcon sx={{color:'#404258'}}/>
              </ListItemIcon>
              <ListItemText sx={{color:'#404258'}} primary="Todo App" />
            </ListItem>
          </List>
        </Drawer>
      </Box>
  )
}

export default NavBar