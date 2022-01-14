import {Search} from '@mui/icons-material';
import {Button, TextField} from '@mui/material';
import React, {useEffect} from 'react';
import {SubHeader, PaperContainer, TitleWithDivider} from '../../../layout';
import BasicTable from '../../BasicTable';
import {useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {getCustomers} from '../../../Redux/Slicer/Customer';
import {columnsBuilder} from '../../../helper';

const Customer = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const Customer = useSelector((state) => state.Customer);
  const CustomerData = Customer.data?.data ?? [];

  useEffect(() => {
    initCustomers();
    return () => {

    };
  }, []);

  const initCustomers = async () => {
    await dispatch(getCustomers()).unwrap();
  };

  const handleUpdate = (id) => {
    const data = CustomerData.filter((item) => item.id === id);
    navigate(`/customer/update/${id}`, {state: {data}});
  };

  const handleDelete = (id) => {
    console.log('delete not implemented');
  };

  return (
    <PaperContainer elevation={3} square>
      <TitleWithDivider>Customer</TitleWithDivider>
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
      <BasicTable
        dataRows={CustomerData}
        dataColumns={
          columnsBuilder(CustomerData[0], handleUpdate, handleDelete)
        }
      />
    </PaperContainer>
  );
};

export default Customer;
