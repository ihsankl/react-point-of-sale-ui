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
import TotalProfit from './TotalProfit';

const ReportSales = () => {
  const [mount, setMount] = useState();

  useEffect(() => {
    if (!mount) {
      setMount(true);
    }

    return () => {

    };
  }, [mount]);

  return (
    <PaperContainer elevation={3} square>
      <Box sx={{display: 'flex', flexDirection: 'column', gap: '1em'}}>
        <Box sx={{display: 'flex', gap: '1em'}}>
          <Budget />
          <TotalTransaction />
          <TotalProfit/>
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

export default React.memo(ReportSales);
