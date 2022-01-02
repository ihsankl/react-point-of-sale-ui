import {Button, TextField} from '@mui/material';
import React from 'react';
import {SubHeader, PaperContainer, Title} from '../../../layout';
import {useNavigate} from 'react-router-dom';
import {Search} from '@mui/icons-material';
import BasicTable from '../../BasicTable';

const Product = () => {
  const navigate = useNavigate();
  return (
    <PaperContainer elevation={3} square>
      <Title>Product</Title>
      <SubHeader>
        <Button
          onClick={()=> navigate('create')}
          variant="contained"
        >Create New</Button>
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

export default Product;
