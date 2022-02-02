import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Divider,
  Box,
  Typography,
  CircularProgress,
} from '@mui/material';
import {headersBuilder, rupiahFormatter, uuid} from '../../../helper';
import {styled} from '@mui/material/styles';
import axios from 'axios';

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
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getData();

    return () => {

    };
  }, []);

  const getData = async () => {
    try {
      setLoading(true);
      const res = await axios
          .get(`${process.env.REACT_APP_API_URL}/reports/yearly`,
              {...headersBuilder()},
          );
      setData(res.data.data);
      setLoading(false);
    } catch (error) {
      // TODO: show error alert
      setData([]);
      console.log(error.message);
    }
  };

  const renderCell = (data) => {
    const temp = [];
    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        temp.push(
            <TableRow
              key={uuid()}
              hover
            >
              <TableCell>
                <Typography variant='h5'>
                  {key}
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Typography variant='h5'>
                  {`${rupiahFormatter(data[key])}`}
                </Typography>
              </TableCell>
            </TableRow>,
        );
      }
    }
    return temp;
  };

  return (
    <Card sx={{width: '100%'}} elevation={3} {...props}>
      <CardHeader title="Yearly Gross" />
      <Divider/>
      {loading ?
      <Box
        sx={{
          minHeight: '785.578px',
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <CircularProgress />
      </Box> :
      <Box
        sx={{
          width: '100%',
        }}
      >
        {/* loop for each year */}
        {/* oldest year first */}
        {data.map((item, index) => {
          if (tablePage === 1 && index <= 2) {
            return (
              <Table key={uuid()}>
                <TableBody>
                  <TableRow>
                    <TableCell align='left'>
                      <Typography variant='button' sx={{fontSize: '25px'}}>
                        {Object.keys(item)[0]}
                      </Typography>
                    </TableCell>
                    <TableCell/>
                  </TableRow>
                  {/* loop for each month */}
                  {renderCell(Object.values(item)[0]).map((val) => val)}
                  {/*  */}

                  {/*  */}
                  <TableRow>
                    <TableCell/>
                    <TableCell align='right' >
                      <Box>
                        <Typography variant='button' sx={{fontSize: '25px'}}>
                          {/* the total of total_amount from item.year */}
                          {`TOTAL:${
                            rupiahFormatter(Object.values(item)[1] ?? 0)
                          }`}
                        </Typography>
                      </Box>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            );
          }
          if (tablePage === 2 && index >= 3) {
            return (
              <Table key={uuid()}>
                <TableBody>
                  <TableRow>
                    <TableCell align='left'>
                      <Typography variant='button' sx={{fontSize: '25px'}}>
                        {Object.keys(item)[0]}
                      </Typography>
                    </TableCell>
                    <TableCell/>
                  </TableRow>
                  {renderCell(item[Object.values(item)[0]]).map((val) => val)}
                  <TableRow>
                    <TableCell/>
                    <TableCell align='right' >
                      <Box>
                        <Typography variant='button' sx={{fontSize: '25px'}}>
                          {/* the total of total_amount from item.year */}
                          {`TOTAL:${
                            rupiahFormatter(Object.values(item)[1] ?? 0)
                          }`}
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
      }
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

export default React.memo(YearlyGross);
