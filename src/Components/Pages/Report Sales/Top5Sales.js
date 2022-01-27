import React, {useEffect, useState} from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Divider,
  Typography,
  useTheme,
} from '@mui/material';
import {headersBuilder, randomColor} from '../../../helper';
import axios from 'axios';
import {Box} from '@mui/system';
import {Doughnut} from 'react-chartjs-2';

const Top5Sales = ({...props}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const theme = useTheme();

  // eslint-disable-next-line no-unused-vars
  const getData = async () => {
    try {
      setLoading(true);
      const res = await axios
          .get(`${process.env.REACT_APP_API_URL}/reports/top5`,
              {...headersBuilder()},
          );
      const newData = [...res.data?.data];
      // eslint-disable-next-line no-unused-vars
      const x = newData?.map((value) => {
        value.color = randomColor();
        return value;
      });
      setData(x);
      setLoading(false);
    } catch (error) {
      setData([]);
      // TODO: show error alert
      console.log(error.message);
    }
  };

  useEffect(() => {
    getData();
    return () => {

    };
  }, []);


  const dataChart = {
    datasets: [
      {
        // assign qty from top5Sales value to data
        data: data?.map((value) => value.qty),
        backgroundColor: data?.map((v) => v.color),
        borderWidth: 8,
        borderColor: '#FFFFFF',
        hoverBorderColor: '#FFFFFF',
      },
    ],
    labels: data?.map((v) => v.product_name),
  };

  const options = {
    animation: false,
    cutoutPercentage: 80,
    layout: {padding: 0},
    legend: {
      display: false,
    },
    maintainAspectRatio: false,
    responsive: true,
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

  const products = data?.map((item, index) => {
    return {
      title: item.product_name,
      value: item.qty,
      color: dataChart.datasets[0].backgroundColor[index],
    };
  });

  return (
    <Card elevation={3} sx={{height: '100%'}} {...props}>
      <CardHeader title="Top 5 Sales" />
      <Divider />
      {loading ? (
        <Box
          sx={{
            minHeight: 400,
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <CardContent>
          <Box
            sx={{
              height: 300,
              position: 'relative',
            }}
          >
            <Doughnut
              data={dataChart}
              options={options}
            />
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              pt: 2,
            }}
          >
            {products.map(({
              color,
              title,
              value,
            }) => (
              <Box
                key={title}
                sx={{
                  p: 1,
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <Typography
                  color="textPrimary"
                  variant="body1"
                >
                  {title}
                </Typography>
                <Typography
                  sx={{color}}
                  variant="h4"
                >
                  {value}
                </Typography>
              </Box>
            ))}
          </Box>
        </CardContent>
      )}
    </Card>
  );
};

export default React.memo(Top5Sales);
