import React from 'react';
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
import dayjs from 'dayjs';

const Top5Sales = ({...props}) => {
  const theme = useTheme();
  const InvoiceState = useSelector((state) => state.Invoice);
  const ProductState = useSelector((state) => state.Product);
  const SalesState = useSelector((state) => state.Sales);
  const InvoiceStateData = InvoiceState.data?.data ?? [];
  const ProductStateData = ProductState.data?.data ?? [];
  const SalesStateData = SalesState.data?.data ?? [];

  //   find all invoice this month
  const thisMonthInvoice = InvoiceStateData.filter(
      (invoice) => dayjs(invoice.date_recorded).isSame(dayjs(), 'month'),
  );
  //   get all sales which has invoice_id in SalesStateData
  const thisMonthSales = SalesStateData.filter(
      (sales) => thisMonthInvoice.some((invoice) =>
        invoice.id === sales.invoice_id),
  );
  //   get all products which has product_id in thisMonthSales
  const thisMonthProducts = ProductStateData.filter(
      (product) => thisMonthSales.some((sales) =>
        sales.product_id === product.id),
  );
  //   sum all qty with same produt_id in thisMonthSales
  const thisMonthSalesQty = thisMonthProducts.reduce((acc, cur) => {
    const qty = thisMonthSales.filter((sales) =>
      sales.product_id === cur.id).reduce(
        (acc, cur) => acc + cur.qty,
        0,
    );
    return {...acc, [cur.name]: qty};
  }, {});
  // get top 5 product with max qty from thisMonthSalesQty
  const top5Sales = () => {
    const y = Object.keys(thisMonthSalesQty).sort((a, b) =>
      thisMonthSalesQty[b] - thisMonthSalesQty[a]).slice(0, 5);
    const x = y.map((v, i) => {
      return {
        label: v,
        value: thisMonthSalesQty[v],
        color: randomColor(i),
      };
    });
    return x;
  };

  const data = {
    datasets: [
      {
        // assign qty from top5Sales value to data
        data: top5Sales().map((v) => v.value),
        backgroundColor: top5Sales().map((v) => v.color),
        borderWidth: 8,
        borderColor: '#FFFFFF',
        hoverBorderColor: '#FFFFFF',
      },
    ],
    labels: top5Sales().map((v) => v.label),
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

  const products = top5Sales().map((item, index) => {
    return {
      title: item.label,
      value: item.value,
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

export default Top5Sales;
