// /* eslint-disable */
import {ArrowDownward, ArrowUpward, Money} from '@mui/icons-material';
import {
  Avatar,
  Card,
  CardContent,
  CircularProgress,
  Typography,
} from '@mui/material';
import {Box} from '@mui/system';
import React, {useEffect, useState} from 'react';
import {headersBuilder, rupiahFormatter} from '../../../helper';
import axios from 'axios';

const Budget = ({...props}) => {
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
          .get(`${process.env.REACT_APP_API_URL}/reports/budget`,
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
    <Card
      elevation={3}
      sx={{
        flex: 1,
      }}
      {...props}
    >
      {loading ?
      <Box
        sx={{
          height: '100%',
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
                {rupiahFormatter(data?.totalBudget)}
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
          <Box
            sx={{
              pt: 2,
              display: 'flex',
              alignItems: 'center',
            }}
          >
            {data?.diffFromLastMonth > 0 ?
              <ArrowUpward color="success" />:
            <ArrowDownward color="error" />
            }
            <Typography
              color={data?.diffFromLastMonth > 0 ?
                  'success' : 'error'
              }
              sx={{
                mr: 1,
              }}
              variant="body2"
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

export default React.memo(Budget);
