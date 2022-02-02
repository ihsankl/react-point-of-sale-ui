import {ArrowDownward, ArrowUpward, People} from '@mui/icons-material';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CircularProgress,
  Typography,
} from '@mui/material';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {headersBuilder, thousandFormatter} from '../../../helper';

const TotalTransaction = ({...props}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getData();
    return () => {

    };
  }, []);

  const getData = async () => {
    try {
      setLoading(true);
      const res = await axios
          .get(`${process.env.REACT_APP_API_URL}/reports/transaction`,
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

  return (
    <Card elevation={3} sx={{flex: 1}} {...props}>
      {loading ?
      <Box
        sx={{
          minHeight: '134.078px',
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <CircularProgress />
      </Box> :
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
              {thousandFormatter(data?.totalTransaction)}
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
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            pt: 2,
          }}
        >
          {data?.diffFromLastMonth > 0 ?
          <ArrowUpward color="success" />:
          <ArrowDownward color="error" />
          }
          <Typography
            variant="body2"
            color={data?.diffFromLastMonth > 0 ?
              'success' : 'error'
            }
            sx={{
              mr: 1,
            }}
          >
            {data?.diffFromLastMonth}%
          </Typography>
          <Typography
            color="textSecondary"
            variant="caption"
          >
          Since last month
          </Typography>
        </Box>

      </CardContent>
      }
    </Card>
  );
};

TotalTransaction.propTypes = {};

export default React.memo(TotalTransaction);
