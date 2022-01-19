import {ArrowDownward, ArrowUpward, People} from '@mui/icons-material';
import {Avatar, Box, Card, CardContent, Typography} from '@mui/material';
import React from 'react';
import {isNumber, thousandFormatter} from '../../../helper';
import PropTypes from 'prop-types';

const TotalOrder = ({lastMonthOrderPercent, totalOrder, ...props}) => {
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
              TOTAL SALES ORDER
            </Typography>
            <Typography
              color="textPrimary"
              variant="h4"
            >
              {thousandFormatter(totalOrder)}
            </Typography>
          </Box>
          <Avatar
            sx={{
              backgroundColor: 'success.main',
              height: 56,
              width: 56,
            }}
          >
            <People />
          </Avatar>
        </Box>
        {isNumber(lastMonthOrderPercent()) &&
          <Box
            sx={{
              alignItems: 'center',
              display: 'flex',
              pt: 2,
            }}
          >
            {lastMonthOrderPercent() > 0 ?
          <ArrowUpward color="success" />:
          <ArrowDownward color="error" />}
            <Typography
              variant="body2"
              sx={{
                mr: 1,
              }}
            >
              {lastMonthOrderPercent()}%
            </Typography>
            <Typography
              color="textSecondary"
              variant="caption"
            >
          Since last month
            </Typography>
          </Box>
        }
      </CardContent>
    </Card>
  );
};

TotalOrder.propTypes = {
  lastMonthOrderPercent: PropTypes.func,
  totalOrder: PropTypes.number,
};

export default TotalOrder;
