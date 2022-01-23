/* eslint-disable */
import {ArrowDropDown} from '@mui/icons-material';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  useTheme,
} from '@mui/material';
import React, {useEffect} from 'react';
import {Bar} from 'react-chartjs-2';
import PropTypes from 'prop-types';
import {useSelector} from 'react-redux';
import dayjs from 'dayjs';

const LatestSales = ({...props}) => {
  const theme = useTheme();
  // const SalesState = useSelector((state) => state.Sales);
  const InvoiceState = useSelector((state) => state.Invoice);
  // const SalesStateData = SalesState.data?.data ?? [];
  const InvoiceStateData = InvoiceState.data?.data ?? [];

  // find all invoice between today and last 7 days with dayjs
  const thisMonthInvoice = InvoiceStateData.filter(
      (invoice) => dayjs(invoice.date_recorded).isBetween(
          dayjs().subtract(7, 'day'),
          dayjs(),
      ),
  );
  // last year invoice with same month as today
  const lastYearInvoice = InvoiceStateData.filter(
      (invoice) => dayjs(invoice.date_recorded).isBetween(
          dayjs().subtract(365, 'day'),
          dayjs().subtract(365, 'day').add(1, 'month'),
      ),
  );
  // sum all total_amount in thisMonthInvoice
  const thisMonthTotalAmount = thisMonthInvoice.reduce(
      (total, invoice) => total + invoice.total_amount,
      0,
  );
  // sum all total_amount in lastYearInvoice
  const lastYearTotalAmount = lastYearInvoice.reduce(
      (total, invoice) => total + invoice.total_amount,
      0,
  );  

  const data = {
    datasets: [
      {
        backgroundColor: '#3F51B5',
        barPercentage: 0.5,
        barThickness: 12,
        borderRadius: 4,
        categoryPercentage: 0.5,
        // data sales from last 7 days
        // data: thisMonthInvoice.map((invoice, index) => {
        //   if (index < 7 ) return invoice.total_amount;
        // }),
        data: [],
        label: 'This year',
        maxBarThickness: 10,
      },
      {
        backgroundColor: '#EEEEEE',
        barPercentage: 0.5,
        barThickness: 12,
        borderRadius: 4,
        categoryPercentage: 0.5,
        // data sales from last 7 days last year
        // data: lastYearInvoice.map((invoice, index) => {
        //   if (index < 7 ) return invoice.total_amount;
        // }),
        data: [],
        label: 'Last year',
        maxBarThickness: 10,
      },
    ],
    // iterate 7 times to get 7 days from dayjs
    labels: Array(7).fill('').map((_, index) =>
      dayjs().subtract(index, 'day').format('DD MMM')),
  };

  const options = {
    animation: false,
    cornerRadius: 20,
    layout: {padding: 0},
    legend: {display: false},
    maintainAspectRatio: false,
    responsive: true,
    xAxes: [
      {
        ticks: {
          fontColor: theme.palette?.text?.secondary,
        },
        gridLines: {
          display: false,
          drawBorder: false,
        },
      },
    ],
    yAxes: [
      {
        ticks: {
          fontColor: theme.palette?.text?.secondary,
          beginAtZero: true,
          min: 0,
        },
        gridLines: {
          borderDash: [2],
          borderDashOffset: [2],
          color: theme.palette.divider,
          drawBorder: false,
          zeroLineBorderDash: [2],
          zeroLineBorderDashOffset: [2],
          zeroLineColor: theme.palette?.divider,
        },
      },
    ],
    tooltips: {
      backgroundColor: theme.palette?.background?.paper,
      bodyFontColor: theme.palette?.text?.secondary,
      borderColor: theme.palette?.divider,
      borderWidth: 1,
      enabled: true,
      footerFontColor: theme.palette?.text?.secondary,
      intersect: false,
      mode: 'index',
      titleFontColor: theme.palette?.text?.primary,
    },
  };

  return (
    <Card sx={{height: '100%'}} elevation={3} {...props}>
      <CardHeader
        action={(
          <Button
            endIcon={<ArrowDropDown fontSize="small" />}
            size="small"
          >
              Last 7 days
          </Button>
        )}
        title="Latest Sales"
      />
      <Divider />
      <CardContent>
        <Box
          sx={{
            height: 400,
            position: 'relative',
          }}
        >
          <Bar
            data={data}
            options={options}
          />
        </Box>
      </CardContent>
      <Divider />
    </Card>
  );
};

LatestSales.propTypes = {
  props: PropTypes.object,
};

export default React.memo(LatestSales);
