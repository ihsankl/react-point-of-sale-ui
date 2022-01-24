import React, {useEffect, useState} from 'react';
import {SubHeader, PaperContainer, TitleWithDivider} from '../../../layout';
import {Button, TextField} from '@mui/material';
import {Search} from '@mui/icons-material';
import BasicTable from '../../BasicTable';
import {useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {
  closeConfirmDialog,
  openConfirmDialog,
} from '../../../Redux/Slicer/ConfirmDialog';
import ConfirmDialog from '../../ConfirmDialog';
import {columnsBuilder} from '../../../helper';
import {deleteSales, getAllSales} from '../../../Redux/Slicer/Sales';

const Sales = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [mount, setMount] = useState(false);
  const SalesState = useSelector((state) => state.Sales);
  const SalesData = SalesState.data?.data ?? [];
  const whichData = [];

  useEffect(() => {
    if (!mount) {
      initSales();
      setMount(true);
    }
    return () => {

    };
  }, [SalesData, mount]);

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
          dataRows={SalesData}
          dataColumns={
            columnsBuilder(SalesData[0], handleUpdate, handleDelete)
          }
        />
      </PaperContainer>
      <ConfirmDialog
        onConfirm={() => {
          dispatch(deleteSales(whichData));
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

export default React.memo(Sales);
