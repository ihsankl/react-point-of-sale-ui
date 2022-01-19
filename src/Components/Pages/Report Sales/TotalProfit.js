import {AttachMoney} from '@mui/icons-material';
import {Avatar, Card, CardContent, Typography} from '@mui/material';
import {Box} from '@mui/system';
import React from 'react';
import {rupiahFormatter} from '../../../helper';
import PropTypes from 'prop-types';

const TotalProfit = ({lastMonthProfitPercent, totalProfit, ...props}) => {
  return (
    <Card elevation={3} sx={{flex: 1}} {...props}>
      <CardContent>
        <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
          <Box sx={{display: 'flex', flexDirection: 'column', gap: '1em'}}>
            <Typography
              color="textSecondary"
              gutterBottom
              variant="overline"
            >
                  TOTAL PROFIT
            </Typography>
            <Typography
              color="textPrimary"
              variant="h4"
              sx={{
                overflow: 'hidden',
                maxWidth: '250px',
              }}
            >
              {rupiahFormatter(totalProfit)}
            </Typography>
          </Box>
          <Avatar
            sx={{
              backgroundColor: 'primary.main',
              height: 56,
              width: 56,
            }}
          >
            <AttachMoney />
          </Avatar>
        </Box>
      </CardContent>
    </Card>
  );
};

TotalProfit.propTypes = {
  lastMonthProfitPercent: PropTypes.func,
  totalProfit: PropTypes.number,
};

export default TotalProfit;
