import {Money} from '@mui/icons-material';
import {Avatar, Card, CardContent, Typography} from '@mui/material';
import {Box} from '@mui/system';
import React from 'react';
import {rupiahFormatter} from '../../../helper';
import {useSelector} from 'react-redux';
import dayjs from 'dayjs';

const Budget = ({...props}) => {
  const PurchaseOrderState = useSelector((state) => state.PurchaseOrder);
  const PurchaseOrderStateData = PurchaseOrderState.data?.data ?? [];

  // get purchase order data this month with dayjs
  const thisMonthPurchaseOrder = PurchaseOrderStateData.filter(
      (item) =>
        dayjs(item.order_date).isSame(dayjs(), 'month') &&
        dayjs(item.order_date).isSame(dayjs(), 'year'),
  );
  // count sub_total of this month purchase order
  const thisMonthPurchaseOrderSubTotal = thisMonthPurchaseOrder.reduce(
      (acc, item) => acc + item.sub_total,
      0,
  );

  return (
    <Card
      elevation={3}
      sx={{flex: 1}}
      {...props}
    >
      <CardContent>
        <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
          <Box sx={{display: 'flex', flexDirection: 'column', gap: '1em'}}>
            <Typography
              color="textSecondary"
              gutterBottom
              variant="overline"
            >
            BUDGET
            </Typography>
            <Typography
              color="textPrimary"
              variant="h4"
              sx={{
                overflow: 'hidden',
                maxWidth: '250px',
              }}
            >
              {rupiahFormatter(thisMonthPurchaseOrderSubTotal)}
            </Typography>
          </Box>
          <Avatar
            sx={{
              backgroundColor: 'error.main',
              height: 56,
              width: 56,
            }}
          >
            <Money />
          </Avatar>
        </Box>
        {/* {isNumber(thisMonthPurchaseOrderSubTotalCompareInPercent) &&
          <Box
            sx={{
              pt: 2,
              display: 'flex',
              alignItems: 'center',
            }}
          >
            {thisMonthPurchaseOrderSubTotalCompareInPercent > 0 ?
            <ArrowUpward color="success" />:
          <ArrowDownward color="error" />
            }
            <Typography
              color={thisMonthPurchaseOrderSubTotalCompareInPercent > 0 ?
                'success' : 'error'
              }
              sx={{
                mr: 1,
              }}
              variant="body2"
            >
              {thisMonthPurchaseOrderSubTotalCompareInPercent.toFixed(2)}%
            </Typography>
            <Typography
              color="textSecondary"
              variant="caption"
            >
          Since last month
            </Typography>
          </Box>
        } */}
      </CardContent>
    </Card>
  );
};

export default Budget;
