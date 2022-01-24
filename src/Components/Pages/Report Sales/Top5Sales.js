// eslint-disable-next-line no-unused-vars
/* eslint-disable */
import React, {useEffect, useMemo} from 'react';
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
// import {randomColor} from '../../../helper';
import dayjs from 'dayjs';
import {randomColor} from '../../../helper';

const Top5Sales = ({...props}) => {
  const theme = useTheme();
  const InvoiceState = useSelector((state) => state.Invoice);
  const ProductState = useSelector((state) => state.Product);
  const SalesState = useSelector((state) => state.Sales);
  const InvoiceStateData = InvoiceState.data?.data ?? [];
  const ProductStateData = ProductState.data?.data ?? [];
  const SalesStateData = SalesState.data?.data ?? [];

  //   find all invoice this month
  const thisMonthInvoice = useMemo(() => {
    return InvoiceStateData.filter(
        (invoice) => dayjs(invoice.date_recorded).isSame(dayjs(), 'month'),
    );
  }, [InvoiceStateData]);
  //   get all sales which has invoice_id in SalesStateData
  const thisMonthSales = useMemo(() => {
    return SalesStateData.filter(
        (sales) => thisMonthInvoice.some((invoice) =>
          invoice.id === sales.invoice_id),
    );
  }, [SalesStateData, thisMonthInvoice]);
  //   get all products which has product_id in thisMonthSales
  const thisMonthProducts = useMemo(() => {
    return ProductStateData.filter(
        (product) => thisMonthSales.some((sales) =>
          sales.product_id === product.id),
    );
  }, [ProductStateData, thisMonthSales]);
  //   sum all qty with same produt_id in thisMonthSales
  const thisMonthSalesQty = useMemo(() => {
    return thisMonthProducts.reduce((acc, cur) => {
      const qty = thisMonthSales.filter((sales) =>
        sales.product_id === cur.id).reduce(
          (acc, cur) => acc + cur.qty,
          0,
      );
      return {...acc, [cur.name]: qty};
    }, {});
  }, [thisMonthProducts, thisMonthSales]);

  // get top 5 product with max qty from thisMonthSalesQty
  const top5Products = useMemo(() => {
    const y = Object.keys(thisMonthSalesQty).sort((a, b) =>
      thisMonthSalesQty[b] - thisMonthSalesQty[a]).slice(0, 5);
    const x = y.map((v, i) => {
      return {
        // shows the name of the product
        label: v,
        value: thisMonthSalesQty[v],
        color: randomColor(),
      };
    });
    return x;
  }, [thisMonthSalesQty]);

  const data = {
    datasets: [
      {
        // assign qty from top5Sales value to data
        data: top5Products.map((v) => v.value),
        backgroundColor: top5Products.map((v) => v.color),
        borderWidth: 8,
        borderColor: '#FFFFFF',
        hoverBorderColor: '#FFFFFF',
      },
    ],
    labels: top5Products.map((v) => v.label),
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

  const products = useMemo(() => {
    return top5Products.map((item, index) => {
      return {
        title: item.label,
        value: item.value,
        color: data.datasets[0].backgroundColor[index],
      };
    });
  }, [ProductStateData, SalesStateData]);

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

export default React.memo(Top5Sales);
