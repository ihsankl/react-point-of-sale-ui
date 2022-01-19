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
import React, { useEffect } from 'react';
import {Bar} from 'react-chartjs-2';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';
import { getInvoices, getSales } from '../../../helper';

const LatestSales = ({...props}) => {
  const theme = useTheme();
  const SalesState = useSelector((state) => state.Sales);
  const InvoiceState = useSelector((state) => state.Invoice);
  const SalesStateData = SalesState.data?.data ?? [];
  const InvoiceStateData = InvoiceState.data?.data ?? [];

  // find all invoice between today and last 7 days with dayjs
  const last7daysInvoice = getInvoices(7, InvoiceStateData);

  // find all sales which has invoice_id in last7daysInvoice
  const last7daysSales = getSales(last7daysInvoice, SalesStateData);

  // find all invoice between today and last 30 days with dayjs
  const last30daysInvoice = getInvoices(30, InvoiceStateData);

  // find all sales which has invoice_id in last30daysInvoice
  const last30daysSales = getSales(last30daysInvoice, SalesStateData);

  // find all invoice between today and last 90 days with dayjs
  const last90daysInvoice = getInvoices(90, InvoiceStateData);

  // find all sales which has invoice_id in last90daysInvoice
  const last90daysSales = getSales(last90daysInvoice, SalesStateData);

  // find all invoice between today and last 365 days with dayjs
  const last365daysInvoice = getInvoices(365, InvoiceStateData);

  // find all sales which has invoice_id in last365daysInvoice
  const last365daysSales = getSales(last365daysInvoice, SalesStateData);

  // find all invoice with the same date_recorded last year
  const lastYearInvoice7days = () => {
    const today = dayjs();
    const lastYear = today.subtract(1, 'year');
    const lastYearInvoice = InvoiceStateData.filter(
      (invoice) => dayjs(invoice.date_recorded).isSame(lastYear, 'year'),
    );
    return lastYearInvoice;
  };

  // find all sales which has invoice_id in lastYearInvoice7days
  const lastYearSales7days = () => {
    const invoice = lastYearInvoice7days();
    const lastYearSales = SalesStateData.filter(
      (sale) => invoice.some(
        (invoice) => invoice.id === sale.invoice_id,
      ),
    );
    return lastYearSales;
  };

  // find all invoice with the same date_recorded last year
  const lastYearInvoice30days = () => {
    const today = dayjs();
    const lastYear = today.subtract(1, 'year');
    const lastYearInvoice = InvoiceStateData.filter(
      (invoice) => dayjs(invoice.date_recorded).isSame(lastYear, 'year'),
    );
    return lastYearInvoice;
  };

  // find all sales which has invoice_id in lastYearInvoice30days
  const lastYearSales30days = () => {
    const invoice = lastYearInvoice30days();
    const lastYearSales = SalesStateData.filter(
      (sale) => invoice.some(
        (invoice) => invoice.id === sale.invoice_id,
      ),
    );
    return lastYearSales;
  };

  // find all invoice with the same date_recorded last year
  const lastYearInvoice90days = () => {
    const today = dayjs();
    const lastYear = today.subtract(1, 'year');
    const lastYearInvoice = InvoiceStateData.filter(
      (invoice) => dayjs(invoice.date_recorded).isSame(lastYear, 'year'),
    );
    return lastYearInvoice;
  };

  // find all sales which has invoice_id in lastYearInvoice90days
  const lastYearSales90days = () => {
    const invoice = lastYearInvoice90days();
    const lastYearSales = SalesStateData.filter(
      (sale) => invoice.some(
        (invoice) => invoice.id === sale.invoice_id,
      ),
    );
    return lastYearSales;
  };

  // find all invoice with the same date_recorded last year
  const lastYearInvoice365days = () => {
    const today = dayjs();
    const lastYear = today.subtract(1, 'year');
    const lastYearInvoice = InvoiceStateData.filter(
      (invoice) => dayjs(invoice.date_recorded).isSame(lastYear, 'year'),
    );
    return lastYearInvoice;
  };

  const data = {
    datasets: [
      {
        backgroundColor: '#3F51B5',
        barPercentage: 0.5,
        barThickness: 12,
        borderRadius: 4,
        categoryPercentage: 0.5,
        // data sales from last 7 days
        data: last7daysSales.map((sale) => sale.sub_total),
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
        data: lastYearSales7days().map((sale) => sale.sub_total),
        label: 'Last year',
        maxBarThickness: 10,
      },
    ],
    // iterate 7 times to get 7 days from dayjs
    labels: Array(7).fill('').map((_, index) => dayjs().subtract(index, 'day')),
    // labels: ['1 Aug', '2 Aug', '3 Aug', '4 Aug', '5 Aug', '6 Aug', '7 aug'],
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

export default LatestSales;
