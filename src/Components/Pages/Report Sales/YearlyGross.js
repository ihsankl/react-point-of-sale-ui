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
  Divider,
  Box,
  Typography,
} from '@mui/material';
import {ArrowRight} from '@mui/icons-material';
import {monthName, rupiahFormatter, uuid} from '../../../helper';
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
  const years = Array.from(Array(6).keys()).map((i) => {
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
      const yearMonthlyInvoiceSum = yearMonthlyInvoice
          .reduce((acc, [month, invoice]) => {
            const monthInvoiceSum = invoice.reduce((acc, invoice) => {
              return acc + invoice.total_amount;
            }, 0);
            return {...acc, [month]: monthInvoiceSum};
          }, {});
      return {...acc, [year]: yearMonthlyInvoiceSum};
    }, {});
  };
  // convert monthlyInvoiceSum to array
  const monthlyInvoiceSumArray =
  Object.entries(monthlyInvoiceSum()).map(([year, invoice]) => {
    return {year, invoice};
  });
  // sum total for each year
  // eslint-disable-next-line no-unused-vars
  const yearlyInvoiceSum = () => {
    // example return value: 2020:1000
    return years.reduce((acc, year) => {
      const yearInvoice = yearlyInvoice()[year];
      const yearInvoiceSum = yearInvoice.reduce((acc, invoice) => {
        return acc + invoice.total_amount;
      }, 0);
      return {...acc, [year]: yearInvoiceSum};
    }, {});
  };

  useEffect(() => {
    console.log('yearlyInvoiceSum >>>', yearlyInvoiceSum());

    return () => {

    };
  }, [InvoiceStateData]);

  const renderMonthly = (data) => {
    const comps = [];
    for ( const property in data.invoice ) {
      if (Object.prototype.hasOwnProperty.call(data.invoice, property)) {
        comps.push(
            <TableRow
              hover
              key={uuid()}
            >
              <TableCell>
                <Typography variant='h5'>
                  {`${monthName(property)}: `}
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Typography variant='h5'>
                  {`${rupiahFormatter(data.invoice[property])}`}
                </Typography>
              </TableCell>
            </TableRow>,
        );
      }
    }
    return comps;
  };

  return (
    <Card sx={{width: '100%'}} elevation={3} {...props}>
      <CardHeader title="Yearly Gross" />
      <Divider/>
      <Box
        sx={{
          width: '100%',
        }}
      >
        {/* loop for each year */}
        {/* oldest year first */}
        {monthlyInvoiceSumArray.map((item, index) => {
          if (tablePage === 1 && index <= 2) {
            return (
              <Table key={uuid()}>
                <TableBody>
                  <TableRow>
                    <TableCell align='left'>
                      <Typography variant='button' sx={{fontSize: '25px'}}>
                        {item.year}
                      </Typography>
                    </TableCell>
                    <TableCell/>
                  </TableRow>
                  {renderMonthly(item).map((val) => val)}
                  <TableRow>
                    <TableCell/>
                    <TableCell align='right' >
                      <Box>
                        <Typography variant='button' sx={{fontSize: '25px'}}>
                          {/* the total of total_amount from item.year */}
                          {`TOTAL:   ${rupiahFormatter(
                              Object.values(
                                  item.invoice,
                              ).reduce((acc, val) => acc + val, 0),
                          )}`}
                        </Typography>
                      </Box>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            );
          }
          if (tablePage === 2 && index > 2) {
            return (
              <Table key={uuid()}>
                <TableBody>
                  <TableRow>
                    <TableCell align='left'>
                      <Typography variant='button' sx={{fontSize: '25px'}}>
                        {item.year}
                      </Typography>
                    </TableCell>
                    <TableCell/>
                  </TableRow>
                  {renderMonthly(item).map((val) => val)}
                  <TableRow>
                    <TableCell/>
                    <TableCell align='right' >
                      <Box>
                        <Typography variant='button' sx={{fontSize: '25px'}}>
                          {/* the total of total_amount from item.year */}
                          {`TOTAL:   ${rupiahFormatter(
                              Object.values(
                                  item.invoice,
                              ).reduce((acc, val) => acc + val, 0),
                          )}`}
                        </Typography>
                      </Box>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            );
          }
        })}
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
