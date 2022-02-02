import {Button} from '@mui/material';
import React, {useEffect} from 'react';
import {SubHeader, PaperContainer, TitleWithDivider} from '../../../layout';
import BasicTable from '../../BasicTable';
import {useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {
  clearSuccess,
  deleteCustomer,
  getCustomers,
} from '../../../Redux/Slicer/Customer';
import {columnsBuilder} from '../../../helper';
import ConfirmDialog from '../../ConfirmDialog';
import {
  closeConfirmDialog,
  openConfirmDialog,
} from '../../../Redux/Slicer/ConfirmDialog';
import {setMountPage, unsetMountPage} from '../../../Redux/Slicer/AppState';

const Customer = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const Customer = useSelector((state) => state.Customer);
  const mount = useSelector((state) => state.AppState.pageMounted.customer);
  const CustomerData = Customer.data?.data ?? [];
  let whichData = [];

  useEffect(() => {
    // only init if data is empty
    if (!mount && CustomerData.length === 0) {
      initCustomers();
      dispatch(setMountPage('customer'));
    }

    if (Customer.isSuccess) dispatch(clearSuccess());

    return () => {

    };
  }, [Customer, mount]);

  const initCustomers = async () => {
    await dispatch(getCustomers()).unwrap();
  };

  const handleUpdate = (id) => {
    const data = CustomerData.filter((item) => item.id === id);
    navigate(`/customer/update/${id}`, {state: {data}});
  };

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
          dataRows={CustomerData}
          dataColumns={
            columnsBuilder(CustomerData[0], handleUpdate, handleDelete)
          }
        />
      </PaperContainer>
      <ConfirmDialog
        onConfirm={() => {
          dispatch(deleteCustomer(whichData));
          dispatch(unsetMountPage('customer'));
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
