/* eslint-disable */
import React, {useState} from 'react';
import {
  Drawer, Toolbar, Box,
  List,
  AppBar,
  Typography,
  Paper,
} from '@mui/material';
import {
  ShoppingCart,
} from '@mui/icons-material';
import Header from './Components/Header';
import SidebarMenu from './Components/SidebarMenu';
import {styled} from '@mui/material/styles';
const APP_NAME = process.env.REACT_APP_NAME;

const PaperContainer = styled(Paper)(({theme}) => ({
  ...theme.typography.body1,
  padding: theme.spacing(1),
  marginTop:'5em',
  marginLeft:'.5em', 
  marginRight:'.5em', 
  display:'flex', 
  flex:1, 
  paddingLeft:'1em', 
  paddingRight:'1em', 
  flexDirection:'column', 
  height:'100%',
}));

const App = ()=> {
  const [anchor, setAnchor] = useState(null);
  const [open, setOpen] = useState(false);
  return (
    <div style={{display: 'flex'}}>
      <Header openDrawer={setOpen} />

      <Drawer
        sx={{width: '18em'}}
        variant='permanent'
        anchor="left"
        open={true}
        onClose={() => setOpen(false)}
      >
        <Box
          sx={{width: '18em', paddingTop:'4em'}}
          role="presentation"
        >
          <List>
            <SidebarMenu />
          </List>
        </Box>
      </Drawer>
      <PaperContainer elevation={3} square>
<h1>aaaaaaaaaaaaaaaaAAAAAAAAAAa</h1>
      </PaperContainer>
    </div>
  );
};

export default App;
