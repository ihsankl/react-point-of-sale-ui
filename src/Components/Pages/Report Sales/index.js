import React, {useState, useEffect} from 'react';
import {
  Divider,
} from '@mui/material';
import {Box} from '@mui/system';
import {PaperContainer} from '../../../layout';
import Budget from './Budget';
import TotalGross from './TotalGross';
import LatestSales from './LatestSales';
import Top5Sales from './Top5Sales';
import YearlyGross from './YearlyGross';
import TotalTransaction from './TotalTransaction';
import {useDispatch} from 'react-redux';
import {getProduct} from '../../../Redux/Slicer/Product';
import {getInvoice} from '../../../Redux/Slicer/Invoice';
import {getPurchaseOrder} from '../../../Redux/Slicer/Purchase Order';
import {getReceiveProduct} from '../../../Redux/Slicer/Receive Product';
import {getAllSales} from '../../../Redux/Slicer/Sales';

const ReportSales = () => {
  const [mount, setMount] = useState();
  const dispatch = useDispatch();

  const reInitAllData = async () => {
    await dispatch(getProduct()).unwrap();
    await dispatch(getInvoice()).unwrap();
    await dispatch(getPurchaseOrder()).unwrap();
    await dispatch(getReceiveProduct()).unwrap();
    await dispatch(getAllSales()).unwrap();
  };

  useEffect(() => {
    if (!mount) {
      reInitAllData();
      setMount(true);
    }

    return () => {

    };
  }, []);


  return (
    <PaperContainer elevation={3} square>
      <Box sx={{display: 'flex', flexDirection: 'column', gap: '1em'}}>
        <Box sx={{display: 'flex', gap: '1em'}}>
          <Budget />
          <TotalTransaction />
          <TotalGross />
        </Box>
        <Divider />
        <Box sx={{display: 'flex', gap: '2em'}}>
          <Box sx={{flex: 2}}>
            <LatestSales/>
          </Box>
          <Box sx={{flex: 1}}>
            <Top5Sales/>
          </Box>
        </Box>
        <Divider />
        <Box sx={{display: 'flex', gap: '1em'}}>
          <YearlyGross sx={{width: '50%'}} tablePage={1} />
          <YearlyGross sx={{width: '50%'}} tablePage={2} />
        </Box>
      </Box>
    </PaperContainer>
  );
};

export default ReportSales;
