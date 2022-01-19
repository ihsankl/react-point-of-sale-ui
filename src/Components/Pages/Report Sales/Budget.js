import {ArrowDownward, ArrowUpward, Money} from '@mui/icons-material';
import {Avatar, Card, CardContent, Typography} from '@mui/material';
import {Box} from '@mui/system';
import React, {useEffect} from 'react';
// eslint-disable-next-line no-unused-vars
import PropTypes from 'prop-types';
import {isNumber, rupiahFormatter} from '../../../helper';
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

  // get purchase order data last month with dayjs
  const lastMonthPurchaseOrder = PurchaseOrderStateData.filter(
      (item) =>
        dayjs(item.order_date).isSame(dayjs().subtract(1, 'month'), 'month') &&
        dayjs(item.order_date).isSame(dayjs().subtract(1, 'month'), 'year'),
  );

  // count sub_total of this month purchase order
  const thisMonthPurchaseOrderSubTotal = thisMonthPurchaseOrder.reduce(
      (acc, item) => acc + item.sub_total,
      0,
  );

  // count sub_total of last month purchase order
  const lastMonthPurchaseOrderSubTotal = lastMonthPurchaseOrder.reduce(
      (acc, item) => acc + item.sub_total,
      0,
  );

  // compare this month purchase order sub_total
  // with last month purchase order sub_total
  const thisMonthPurchaseOrderSubTotalCompareInPercent = (
    thisMonthPurchaseOrderSubTotal / lastMonthPurchaseOrderSubTotal) * 100;

  useEffect(() => {
    console.log('thisMonthPurchaseOrder >>>', thisMonthPurchaseOrder);

    return () => {

    };
  }, []);

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
        {isNumber(thisMonthPurchaseOrderSubTotalCompareInPercent) &&
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
              {/* fixed 2 digits */}
              {thisMonthPurchaseOrderSubTotalCompareInPercent.toFixed(2)}%
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

Budget.propTypes = {};

export default Budget;
