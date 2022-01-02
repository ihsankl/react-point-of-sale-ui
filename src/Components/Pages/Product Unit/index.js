import {Search} from '@mui/icons-material';
import {Button, TextField} from '@mui/material';
import React from 'react';
import {ContentContainer, PaperContainer, Title} from '../../../layout';
import BasicTable from '../../BasicTable';

const ProductUnit = () => {
  return (
    <PaperContainer elevation={3} square>
      <Title>Product Unit</Title>
      <ContentContainer>
        <Button onClick={null} variant="contained">Create New</Button>
        <div style={{display: 'flex', alignItems: 'flex-end'}}>
          <Search sx={{color: 'action.active', mr: 1, my: 0.5}} />
          <TextField
            id="input-with-sx"
            label="Search Item"
            variant="standard"
          />
        </div>
      </ContentContainer>
      <BasicTable/>
    </PaperContainer>
  );
};

export default ProductUnit;
