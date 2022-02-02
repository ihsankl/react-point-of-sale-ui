import React, {useEffect} from 'react';
import {SubHeader, PaperContainer, TitleWithDivider} from '../../../layout';
import {Button} from '@mui/material';
import BasicTable from '../../BasicTable';
import {useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {
  closeConfirmDialog,
  openConfirmDialog,
} from '../../../Redux/Slicer/ConfirmDialog';
import ConfirmDialog from '../../ConfirmDialog';
import {columnsBuilder} from '../../../helper';
// eslint-disable-next-line max-len
import {clearSuccess, deleteSales, getAllSales} from '../../../Redux/Slicer/Sales';
import {unsetMountPage} from '../../../Redux/Slicer/AppState';

const Sales = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const mount = useSelector((state) => state.AppState.pageMounted.sales);
  const SalesState = useSelector((state) => state.Sales);
  const SalesData = SalesState.data?.data ?? [];
  const whichData = [];

  useEffect(() => {
    if (!mount && SalesData.length === 0) {
      initSales();
      dispatch(setMountPage('sales'));
    }

    if (SalesState.isSuccess) {
      dispatch(clearSuccess());
    }

    return () => {

    };
  }, [SalesData, mount, SalesState]);

  const initSales = async () => {
    await dispatch(getAllSales()).unwrap();
  };

  const handleUpdate = (id) => {
    const data = SalesData.filter((item) => item.id === id);
    navigate(`/sales/update/${id}`, {state: {data}});
  };

  const handleDelete = (id) => {
    const newWhichData = SalesData.filter((item) => item.id === id);
    whichData = newWhichData[0];
    const data = {
      title: 'Delete Sales',
      message: 'Are you sure you want to delete this Sales?',
      isOpen: true,
    };
    dispatch(openConfirmDialog(data));
  };

  return (
    <>
      <PaperContainer elevation={3} square>
        <TitleWithDivider>Sale</TitleWithDivider>
        <SubHeader>
          <Button
            onClick={()=> navigate('create')}
            variant="contained"
          >Create New
          </Button>

        </SubHeader>
        <BasicTable
          dataRows={SalesData}
          dataColumns={
            columnsBuilder(SalesData[0], handleUpdate, handleDelete)
          }
        />
      </PaperContainer>
      <ConfirmDialog
        onConfirm={() => {
          dispatch(deleteSales(whichData));
          dispatch(unsetMountPage('sales'));
          dispatch(closeConfirmDialog());
        }}
        onCancel={() => {
          dispatch(closeConfirmDialog());
        }}
      />
    </>
  );
};

export default React.memo(Sales);
