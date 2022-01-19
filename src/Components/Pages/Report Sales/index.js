/* eslint-disable */
import {
  Divider,
} from '@mui/material';
import {Box} from '@mui/system';
import React from 'react';
import dayjs from 'dayjs';
import {PaperContainer} from '../../../layout';
import {useSelector} from 'react-redux';
import Budget from './Budget';
import TotalOrder from './TotalOrder';
import TotalProfit from './TotalProfit';
import LatestSales from './LatestSales';
import Top5Sales from './Top5Sales';
import YearlyGross from './YearlyGross';

const ReportSales = () => {
  const PurchaseOrder = useSelector((state) => state.PurchaseOrder);
  const SalesState = useSelector((state) => state.Sales);
  const Invoice = useSelector((state) => state.Invoice);
  const PurchaseOrderData = PurchaseOrder.data?.data ?? [];
  const SalesData = SalesState.data?.data ?? [];
  const InvoiceData = Invoice.data?.data ?? [];

  // find top 5 most qty on SalesData
  const mostSoldProduct = () => SalesData.sort((a, b) => b.qty - a.qty).slice(0, 20);

  // count qty * sub_total from PurchaseOrderData
  const totalPurchase = PurchaseOrderData.reduce((acc, cur) => {
    return acc + (cur.qty * cur.sub_total);
  }, 0);

  // compare totalSales with last month
  const lastMonthBudgetPercent = () => {
    const lastMonth = dayjs().subtract(1, 'month').format('YYYY-MM-DD');
    const lastMonthBudget = PurchaseOrderData.reduce((acc, cur) => {
      if (cur.order_date.includes(lastMonth)) {
        return acc + (cur.qty * cur.sub_total);
      }
    }, 0);
    const lastMonthDiff = totalPurchase - lastMonthBudget;
    const lastMonthDiffPercentage = (lastMonthDiff / lastMonthBudget) * 100;
    return lastMonthDiffPercentage.toFixed(2);
  };

  // count total sales per month
  const totalSalesPerMonth = SalesData.reduce((acc, cur) => {
    if (cur.date_recorded.includes(dayjs().format('YYYY-MM'))) {
      return acc + (cur.qty * cur.sub_total);
    }
  }, 0);

  // count total order from SalesData
  const totalOrder = SalesData.reduce((acc, cur) => {
    return acc + 1;
  }, 0);

  // count profit
  const totalProfit = InvoiceData.reduce((acc, cur) => {
    return acc + cur.total_amount;
  }, 0);

  // compare total profit with last month
  const lastMonthProfitPercent = () => {
    const lastMonth = dayjs().subtract(1, 'month').format('YYYY-MM-DD');
    const lastMonthProfit = SalesData.reduce((acc, cur) => {
      if (cur.order_date.includes(lastMonth)) {
        return acc + (cur.qty * cur.sub_total) - (cur.qty * cur.price);
      }
    }, 0);
    const lastMonthDiff = totalProfit - lastMonthProfit;
    const lastMonthDiffPercentage = (lastMonthDiff / lastMonthProfit) * 100;
    return lastMonthDiffPercentage.toFixed(2);
  };

  return (
    <PaperContainer elevation={3} square>
      <Box sx={{display: 'flex', flexDirection: 'column', gap: '1em'}}>
        <Box sx={{display: 'flex', gap: '1em'}}>
          <Budget />
          {/* <TotalOrder />
          <TotalProfit /> */}
        </Box>
        <Divider />
        <Box sx={{display: 'flex', gap: '2em'}}>
          <Box sx={{flex: 4}}>
            <LatestSales/>
          </Box>
          <Box sx={{flex: 3}}>
            <Top5Sales/>
          </Box>
        </Box>
        <Divider />
        <Box>
          <YearlyGross/>
        </Box>
      </Box>
    </PaperContainer>
  );
};

export default ReportSales;
