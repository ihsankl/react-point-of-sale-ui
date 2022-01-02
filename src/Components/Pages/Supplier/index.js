import {Search} from '@mui/icons-material';
import {Button, TextField} from '@mui/material';
import React from 'react';
import {SubHeader, PaperContainer, Title} from '../../../layout';
import BasicTable from '../../BasicTable';
import {useNavigate} from 'react-router-dom';

const Supplier = () => {
  const navigate = useNavigate();
  return (
    <PaperContainer elevation={3} square>
      <Title>Supplier</Title>
      <SubHeader>
        <Button
          onClick={()=> navigate('create')}
          variant="contained"
        >Create New
        </Button>
        <div style={{display: 'flex', alignItems: 'flex-end'}}>
          <Search sx={{color: 'action.active', mr: 1, my: 0.5}} />
          <TextField
            id="input-with-sx"
            label="Search Item"
            variant="standard"
          />
        </div>
      </SubHeader>
      <BasicTable/>
    </PaperContainer>
  );
};

export default Supplier;
