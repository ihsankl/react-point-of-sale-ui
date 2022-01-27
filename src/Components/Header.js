import React, {useState} from 'react';
import {
  AppBar, Toolbar, IconButton, Menu, MenuItem, Typography, Box,
} from '@mui/material';
import {
  ShoppingCart,
} from '@mui/icons-material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PropTypes from 'prop-types';
import {useDispatch} from 'react-redux';
import {clearToken, logout} from '../Redux/Slicer/Authentication';

const APP_NAME = process.env.REACT_APP_NAME;

const Header = () => {
  const [anchorEl, setAchorEl] = useState(null);
  const dispatch = useDispatch();

  return (
    <AppBar position="fixed" sx={{zIndex: (theme) => theme.zIndex.drawer + 1}}>
      <Toolbar sx={{justifyContent: 'space-between'}}>
        <Box sx={{display: 'flex'}}>
          <ShoppingCart sx={{marginRight: '1em'}} />
          <Typography variant='button' component="div">
            {APP_NAME}
          </Typography>
        </Box>
        <Box>
          <IconButton
            aria-haspopup="true"
            onClick={(e) => setAchorEl(e.currentTarget)}
            color="inherit"
          >
            <AccountCircleIcon />
          </IconButton>

          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={!!anchorEl}
            onClose={() => setAchorEl(null)}
          >
            <MenuItem onClick={() => console.log('hi')}>
              My Profile
            </MenuItem>
            <MenuItem onClick={() => {
              dispatch(logout());
              dispatch(clearToken());
            }}>
              Logout
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

Header.propTypes = {
  openDrawer: PropTypes.func,
};

export default Header;
