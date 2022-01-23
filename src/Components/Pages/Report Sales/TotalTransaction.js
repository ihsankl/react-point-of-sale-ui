import {People} from '@mui/icons-material';
import {Avatar, Box, Card, CardContent, Typography} from '@mui/material';
import React, {useMemo} from 'react';
import {useSelector} from 'react-redux';
import dayjs from 'dayjs';
import {thousandFormatter} from '../../../helper';

const TotalTransaction = ({...props}) => {
  const InvoiceState = useSelector((state) => state.Invoice);
  const InvoiceStateData = InvoiceState.data?.data ?? [];

  // get all invoice this month
  const thisMonthInvoice = useMemo(() => {
    return InvoiceStateData.filter(
        (invoice) => dayjs(invoice.date_recorded).isSame(dayjs(), 'year'),
    );
  }, [InvoiceStateData]);
  // count all invoice this month
  const thisMonthInvoiceCount = thisMonthInvoice.length;

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
              TOTAL TRANSACTION COUNT
            </Typography>
            <Typography
              color="textPrimary"
              variant="h4"
            >
              {thousandFormatter(thisMonthInvoiceCount)}
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
        {/* {isNumber(totalSalesDiffPercent) &&
          <Box
            sx={{
              alignItems: 'center',
              display: 'flex',
              pt: 2,
            }}
          >
            {totalSalesDiffPercent > 0 ?
          <ArrowUpward color="success" />:
          <ArrowDownward color="error" />
            }
            <Typography
              variant="body2"
              sx={{
                mr: 1,
              }}
            >
              {totalSalesDiffPercent.toFixed(2)}%
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

TotalTransaction.propTypes = {};

export default React.memo(TotalTransaction);
