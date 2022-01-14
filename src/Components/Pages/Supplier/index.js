import {Search} from '@mui/icons-material';
import {Button, TextField} from '@mui/material';
import React from 'react';
import {SubHeader, PaperContainer, TitleWithDivider} from '../../../layout';
import BasicTable from '../../BasicTable';
import {useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {columnsBuilder} from '../../../helper';
import {getSupplier} from '../../../Redux/Slicer/Supplier';

const Supplier = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const Supplier = useSelector((state) => state.Supplier);
  const SupplierData = Supplier.data?.data ?? [];

  useEffect(() => {
    initSupplier();
    return () => {

    };
  }, []);

  const initSupplier = async () => {
    await dispatch(getSupplier()).unwrap();
  };

  const handleUpdate = (id) => {
    const data = SupplierData.filter((item) => item.id === id);
    navigate(`/supplier/update/${id}`, {state: {data}});
  };

  const handleDelete = (id) => {
    console.log('delete not implemented');
  };

  return (
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
  );
};

export default Supplier;
