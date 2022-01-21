import {AttachMoney} from '@mui/icons-material';
import {Avatar, Card, CardContent, Typography} from '@mui/material';
import {Box} from '@mui/system';
import dayjs from 'dayjs';
import React from 'react';
import {useSelector} from 'react-redux';
import {rupiahFormatter} from '../../../helper';

const TotalGross = ({...props}) => {
  const InvoiceState = useSelector((state) => state.Invoice);
  const InvoiceStateData = InvoiceState.data?.data ?? [];

  // get all invoice this month
  const thisMonthInvoice = InvoiceStateData.filter(
      (invoice) => dayjs(invoice.date_recorded).isSame(dayjs(), 'month'),
  );
  // sum all total_amount in thisMonthInvoice
  const totalGross = thisMonthInvoice.reduce((acc, invoice) => {
    return acc + invoice.total_amount;
  }, 0);

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
                  TOTAL GROSS
            </Typography>
            <Typography
              color="textPrimary"
              variant="h4"
              sx={{
                overflow: 'hidden',
                maxWidth: '250px',
              }}
            >
              {rupiahFormatter(totalGross)}
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

export default TotalGross;
