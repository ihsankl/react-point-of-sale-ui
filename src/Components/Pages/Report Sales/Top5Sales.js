import React from 'react';
// eslint-disable-next-line no-unused-vars
import PropTypes from 'prop-types';
import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Typography,
  useTheme,
} from '@mui/material';
import {Box} from '@mui/system';
import {Doughnut} from 'react-chartjs-2';
import {useSelector} from 'react-redux';
import {randomColor} from '../../../helper';

const Top5Sales = ({...props}) => {
  const theme = useTheme();
  const SalesState = useSelector((state) => state.Sales);
  const ProductState = useSelector((state) => state.Product);
  const SalesStateData = SalesState.data?.data ?? [];
  const ProductStateData = ProductState.data?.data ?? [];

  //   find 5 data with highest qty
  const SalesStateDataCopy = [...SalesStateData];
  const top5Sales = SalesStateDataCopy
      .sort((a, b) => b.qty - a.qty).slice(0, 5);

  //   find the product corresponding to the top5Sales
  const top5SalesProduct = top5Sales.map((item) => {
    const product = ProductStateData.find(
        (product) => product.id === item.product_id,
    );
    return product;
  });

  const data = {
    datasets: [
      {
        // assign qty from top5Sales to data
        data: top5Sales.map((item) => item.qty),
        backgroundColor: top5Sales.map(() => randomColor()),
        borderWidth: 8,
        borderColor: '#FFFFFF',
        hoverBorderColor: '#FFFFFF',
      },
    ],
    // get product_id from top5Sales, then
    // get name from top5SalesProduct which
    // has the same id as product_id
    labels: top5Sales.map((item) => {
      const product = top5SalesProduct.find(
          (product) => product.id === item.product_id,
      );
      return product.name;
    }),
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

  const products = top5SalesProduct.map((item, index) => {
    return {
      title: item.name,
      // get qty from top5Sales which has same product_id as
      // top5SalesProduct id
      value: top5Sales.find((sales) => sales.product_id === item.id).qty,
      color: data.datasets[0].backgroundColor[index],
    };
  });

  return (
    <Card elevation={3} sx={{height: '100%'}} {...props}>
      <CardHeader title="Top 5 Sales" />
      <Divider />
      <CardContent>
        <Box
          sx={{
            height: 300,
            position: 'relative',
          }}
        >
          <Doughnut
            data={data}
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
    </Card>
  );
};

Top5Sales.propTypes = {};

export default Top5Sales;
