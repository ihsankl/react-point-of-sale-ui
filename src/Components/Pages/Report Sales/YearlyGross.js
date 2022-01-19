import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Card,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Tooltip,
  Box,
} from '@mui/material';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {ArrowRight} from '@mui/icons-material';
import {uuid} from '../../../helper';
import dayjs from 'dayjs';
import {styled} from '@mui/material/styles';

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

const YearlyGross = ({...props}) => {
  const orders = [
    {
      id: uuid(),
      ref: 'CDD1049',
      amount: 30.5,
      customer: {
        name: 'Ekaterina Tankova',
      },
      createdAt: 1555016400000,
      status: 'pending',
    },
    {
      id: uuid(),
      ref: 'CDD1048',
      amount: 25.1,
      customer: {
        name: 'Cao Yu',
      },
      createdAt: 1555016400000,
      status: 'delivered',
    },
    {
      id: uuid(),
      ref: 'CDD1047',
      amount: 10.99,
      customer: {
        name: 'Alexa Richardson',
      },
      createdAt: 1554930000000,
      status: 'refunded',
    },
    {
      id: uuid(),
      ref: 'CDD1046',
      amount: 96.43,
      customer: {
        name: 'Anje Keizer',
      },
      createdAt: 1554757200000,
      status: 'pending',
    },
    {
      id: uuid(),
      ref: 'CDD1045',
      amount: 32.54,
      customer: {
        name: 'Clarke Gillebert',
      },
      createdAt: 1554670800000,
      status: 'delivered',
    },
    {
      id: uuid(),
      ref: 'CDD1044',
      amount: 16.76,
      customer: {
        name: 'Adam Denisov',
      },
      createdAt: 1554670800000,
      status: 'delivered',
    },
  ];

  return (
    <Card elevation={3} {...props}>
      <CardHeader title="Yearly Gross" />
      <PerfectScrollbar>
        <Box sx={{minWidth: 800}}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                      Order Ref
                </TableCell>
                <TableCell>
                      Customer
                </TableCell>
                <TableCell sortDirection="desc">
                  <Tooltip
                    enterDelay={300}
                    title="Sort"
                  >
                    <TableSortLabel
                      active
                      direction="desc"
                    >
                          Date
                    </TableSortLabel>
                  </Tooltip>
                </TableCell>
                <TableCell>
                      Status
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order) => (
                <TableRow
                  hover
                  key={order.id}
                >
                  <TableCell>
                    {order.ref}
                  </TableCell>
                  <TableCell>
                    {order.customer.name}
                  </TableCell>
                  <TableCell>
                    {dayjs(order.createdAt).format('MMM DD, YYYY')}
                  </TableCell>
                  <TableCell>
                    <SeverityPill
                      color={(order.status === 'delivered' && 'success') ||
                          (order.status === 'refunded' && 'error') ||
                          'warning'}
                    >
                      {order.status}
                    </SeverityPill>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
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

YearlyGross.propTypes = {};
SeverityPill.propTypes = {
  color: PropTypes.oneOf(
      ['primary', 'secondary', 'error', 'warning', 'info', 'success'],
  ),
  children: PropTypes.node,
};

export default YearlyGross;
