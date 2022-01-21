/* eslint-disable */
import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Card,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  // TableHead,
  TableRow,
  // TableSortLabel,
  // Tooltip,
  Box,
} from '@mui/material';
import {ArrowRight} from '@mui/icons-material';
import {uuid} from '../../../helper';
import {styled} from '@mui/material/styles';
import {useSelector} from 'react-redux';
import dayjs from 'dayjs';

const SeverityPillRoot = styled('span')(({theme, ownerState}) => {
  const backgroundColor = theme.palette[ownerState.color].main;
  const color = theme.palette[ownerState.color].contrastText;

  return {
    alignItems: 'center',
    backgroundColor,
    borderRadius: 12,
    color,
    cursor: 'default',
    display: 'inline-flex',
    flexGrow: 0,
    flexShrink: 0,
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.pxToRem(12),
    lineHeight: 2,
    fontWeight: 600,
    justifyContent: 'center',
    letterSpacing: 0.5,
    minWidth: 20,
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    textTransform: 'uppercase',
    whiteSpace: 'nowrap',
  };
});

const SeverityPill = (props) => {
  const {color = 'primary', children, ...other} = props;

  const ownerState = {color};

  return (
    <SeverityPillRoot
      ownerState={ownerState}
      {...other}
    >
      {children}
    </SeverityPillRoot>
  );
};

const YearlyGross = ({tablePage, ...props}) => {
  const InvoiceState = useSelector((state) => state.Invoice);
  const InvoiceStateData = InvoiceState.data?.data ?? [];
  // return 5 years before now as an array
  const years = Array.from(Array(5).keys()).map((i) => {
    return dayjs().subtract(i, 'year').format('YYYY');
  });
  // get invoice for each year
  const yearlyInvoice = () => {
    // example return value: 2020:[{},{},{}]
    return years.reduce((acc, year) => {
      const yearInvoice = InvoiceStateData.filter(
        (invoice) => dayjs(invoice.date_recorded).isSame(year, 'year'),
      );
      return {...acc, [year]: yearInvoice};
    }
    , {});
  };

  // get invoice for each month in each year
  const monthlyInvoice = () => {
    // example return value: 2020:{1:[{},{}], 2:[{},{}], 3:[{},{}]}
    return years.reduce((acc, year) => {
      const yearInvoice = yearlyInvoice()[year];
      const yearMonthlyInvoice = yearInvoice.reduce((acc, invoice) => {
        const month = dayjs(invoice.date_recorded).month();
        return {
          ...acc,
          [month]: [...(acc[month] ?? []), invoice],
        };
      }, {});
      return {...acc, [year]: yearMonthlyInvoice};
    }, {});
  };

  // sum up all invoice for each month in each year
  // first loop through monthlyInvoice object
  // then loop through each month in each year
  // then sum up all invoice in each month
  const monthlyInvoiceSum = () => {
    // example return value: 2020:{1:1000, 2:2000, 3:3000}
    return years.reduce((acc, year) => {
      // cannot reduce monthlyInvoice directly
      // because it is an object
      // so we need to convert it to array first
      const yearMonthlyInvoice = Object.entries(monthlyInvoice()[year]);
      const yearMonthlyInvoiceSum = yearMonthlyInvoice.reduce((acc, [month, invoice]) => {
        const monthInvoiceSum = invoice.reduce((acc, invoice) => {
          return acc + invoice.total_amount;
        }, 0);
        return {...acc, [month]: monthInvoiceSum};
      }, {});
      return {...acc, [year]: yearMonthlyInvoiceSum};
    }, {});
  };


  useEffect(() => {
    console.log('monthlyInvoiceSum >>>', monthlyInvoiceSum());

    return () => {

    };
  }, [InvoiceStateData]);

  const orders = [
    {
      id: uuid(),
      ref: 'January',
      amount: 30.5,
      customer: {
        name: 'Ekaterina Tankova',
      },
      createdAt: 1555016400000,
      status: 'pending',
    },
    {
      id: uuid(),
      ref: 'February',
      amount: 25.1,
      customer: {
        name: 'Cao Yu',
      },
      createdAt: 1555016400000,
      status: 'delivered',
    },
    {
      id: uuid(),
      ref: 'March',
      amount: 10.99,
      customer: {
        name: 'Alexa Richardson',
      },
      createdAt: 1554930000000,
      status: 'refunded',
    },
    {
      id: uuid(),
      ref: 'April',
      amount: 96.43,
      customer: {
        name: 'Anje Keizer',
      },
      createdAt: 1554757200000,
      status: 'pending',
    },
    {
      id: uuid(),
      ref: 'May',
      amount: 32.54,
      customer: {
        name: 'Clarke Gillebert',
      },
      createdAt: 1554670800000,
      status: 'delivered',
    },
    {
      id: uuid(),
      ref: 'June',
      amount: 16.76,
      customer: {
        name: 'Adam Denisov',
      },
      createdAt: 1554670800000,
      status: 'delivered',
    },
  ];

  // const years = [2021, 2022];

  return (
    <Card sx={{width: '100%'}} elevation={3} {...props}>
      <CardHeader title="Yearly Gross" />
      <Box
        sx={{
          width: '100%',
        }}
      >
        <Table>
          <TableBody>
            {orders.map((order) => (
              <TableRow
                hover
                key={order.id}
              >
                <TableCell>
                  {order.ref}
                </TableCell>
                <TableCell align="right">
                  {order.customer.name}
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell/>
              <TableCell
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                }
                }>
                <Box>Total:</Box>
                <Box>$1,234.56</Box>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          p: 2,
        }}
      >
        <Button
          color="primary"
          endIcon={<ArrowRight fontSize="small" />}
          size="small"
          variant="text"
        >
              View all
        </Button>
      </Box>
    </Card>
  );
};

YearlyGross.propTypes = {
  tablePage: PropTypes.number,
};
SeverityPill.propTypes = {
  color: PropTypes.oneOf(
      ['primary', 'secondary', 'error', 'warning', 'info', 'success'],
  ),
  children: PropTypes.node,
};

export default YearlyGross;
