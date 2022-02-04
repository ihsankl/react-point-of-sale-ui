import {Button} from '@mui/material';
import React, {useEffect} from 'react';
import {SubHeader, PaperContainer, TitleWithDivider} from '../../../layout';
import BasicTable from '../../BasicTable';
import {useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {columnsBuilder} from '../../../helper';
// eslint-disable-next-line max-len
import {clearSuccess, deleteSupplier, getSupplier} from '../../../Redux/Slicer/Supplier';
import {
  closeConfirmDialog,
  openConfirmDialog,
} from '../../../Redux/Slicer/ConfirmDialog';
import ConfirmDialog from '../../ConfirmDialog';
import {setMountPage, unsetMountPage} from '../../../Redux/Slicer/AppState';
import {Cached} from '@mui/icons-material';

const Supplier = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const mount = useSelector((state) => state.AppState.pageMounted.supplier);
  const Supplier = useSelector((state) => state.Supplier);
  const SupplierData = Supplier.data?.data ?? [];
  let whichData = [];

  useEffect(() => {
    if (!mount && SupplierData.length === 0) {
      initSupplier();
      dispatch(setMountPage('supplier'));
    }

    if (Supplier.isSuccess) {
      dispatch(clearSuccess());
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
          <Button
            onClick={initSupplier}
            variant='outlined'
            startIcon={<Cached/>}
          >
            Refresh
          </Button>
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
          dispatch(unsetMountPage('supplier'));
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
