import React, {useState} from 'react';
import {
  AppBar, Toolbar, IconButton, Menu, MenuItem, Typography,
} from '@mui/material';
import {
  ShoppingCart,
} from '@mui/icons-material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PropTypes from 'prop-types';

const APP_NAME = process.env.REACT_APP_NAME;

const Header = () => {
  const [anchorEl, setaAchorEl] = useState(null);

  return (
    <AppBar position="fixed" sx={{zIndex: (theme) => theme.zIndex.drawer + 1}}>
      <Toolbar style={{justifyContent: 'space-between'}}>
        <div style={{display: 'flex'}}>
          <ShoppingCart sx={{marginRight: '1em'}} />
          <Typography variant='button' component="div">
            {APP_NAME}
          </Typography>
        </div>
        <div>
          <IconButton
            aria-haspopup="true"
            onClick={(e) => setaAchorEl(e.currentTarget)}
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
            onClose={() => setaAchorEl(null)}
          >
            <MenuItem onClick={() => console.log('hi')}>
              My Profile
            </MenuItem>
            <MenuItem onClick={() => console.log('hi')}>
              Logout
            </MenuItem>
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  );
};

Header.propTypes = {
  openDrawer: PropTypes.func,
};

export default Header;
