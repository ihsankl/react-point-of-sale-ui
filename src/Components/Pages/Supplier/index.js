import {Search} from '@mui/icons-material';
import {Button, TextField} from '@mui/material';
import React, {useEffect, useState} from 'react';
import {SubHeader, PaperContainer, TitleWithDivider} from '../../../layout';
import BasicTable from '../../BasicTable';
import {useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {columnsBuilder} from '../../../helper';
import {deleteSupplier, getSupplier} from '../../../Redux/Slicer/Supplier';
import {
  closeConfirmDialog,
  openConfirmDialog,
} from '../../../Redux/Slicer/ConfirmDialog';
import ConfirmDialog from '../../ConfirmDialog';

const Supplier = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [mount, setMount] = useState(false);
  const Supplier = useSelector((state) => state.Supplier);
  const SupplierData = Supplier.data?.data ?? [];
  let whichData = [];

  useEffect(() => {
    if (!mount) {
      initSupplier();
      setMount(true);
    }
    return () => {

    };
  }, [Supplier, mount]);

  const initSupplier = async () => {
    await dispatch(getSupplier()).unwrap();
  };

  const handleUpdate = (id) => {
    const data = SupplierData.filter((item) => item.id === id);
    navigate(`/supplier/update/${id}`, {state: {data}});
  };

  const handleDelete = (id) => {
    const newWhichData = SupplierData.filter((item) => item.id === id);
    whichData = newWhichData[0];
    const data = {
      title: 'Delete Supplier',
      message: 'Are you sure you want to delete this Supplier?',
      isOpen: true,
    };
    dispatch(openConfirmDialog(data));
  };

  return (
    <>
      <PaperContainer elevation={3} square>
        <TitleWithDivider>Supplier</TitleWithDivider>
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
          dataRows={SupplierData}
          dataColumns={
            columnsBuilder(SupplierData[0], handleUpdate, handleDelete)
          }
        />
      </PaperContainer>
      <ConfirmDialog
        onConfirm={() => {
          dispatch(deleteSupplier(whichData));
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

export default React.memo(Supplier);
