import {Button} from '@mui/material';
import React, {useEffect, useState} from 'react';
import {SubHeader, PaperContainer, TitleWithDivider} from '../../../layout';
import BasicTable from '../../BasicTable';
import {useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {deleteCustomer, getCustomers} from '../../../Redux/Slicer/Customer';
import ConfirmDialog from '../../ConfirmDialog';
import {
  closeConfirmDialog,
  openConfirmDialog,
} from '../../../Redux/Slicer/ConfirmDialog';
// import { openConfirmDialog } from '../../../Redux/Slicer/ConfirmDialog';

const Customer = () => {
  const [mount, setMount] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const Customer = useSelector((state) => state.Customer);
  const CustomerData = Customer.data?.data ?? [];
  let whichData = [];

  useEffect(() => {
    // only init if data is empty
    if (!mount) {
      initCustomers();
      setMount(true);
    }
    return () => {

    };
  }, [Customer, mount]);

  const initCustomers = async () => {
    await dispatch(getCustomers()).unwrap();
  };

  // eslint-disable-next-line no-unused-vars
  const handleUpdate = (id) => {
    const data = CustomerData.filter((item) => item.id === id);
    navigate(`/customer/update/${id}`, {state: {data}});
  };

  // eslint-disable-next-line no-unused-vars
  const handleDelete = (id) => {
    const newWhichData = CustomerData.filter((item) => item.id === id);
    whichData = newWhichData[0];
    const data = {
      title: 'Delete Customer',
      message: 'Are you sure you want to delete this customer?',
      isOpen: true,
    };
    dispatch(openConfirmDialog(data));
  };

  return (
    <>
      <PaperContainer elevation={3} square>
        <TitleWithDivider>Customer</TitleWithDivider>
        <SubHeader>
          <Button
            onClick={()=> navigate('create')}
            variant="contained"
          >Create New
          </Button>

        </SubHeader>
        <BasicTable
          data={CustomerData}
        />
      </PaperContainer>
      <ConfirmDialog
        onConfirm={() => {
          dispatch(deleteCustomer(whichData));
          setMount(false);
          dispatch(closeConfirmDialog());
        }}
        onCancel={() => {
          dispatch(closeConfirmDialog());
        }}
      />
    </>
  );
};

export default React.memo(Customer);
