import {ArrowDropDown} from '@mui/icons-material';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Divider,
  Menu,
  MenuItem,
  useTheme,
} from '@mui/material';
import React, {useEffect, useState} from 'react';
import {Bar} from 'react-chartjs-2';
import PropTypes from 'prop-types';
import axios from 'axios';
import {headersBuilder, uncapitalize} from '../../../helper';
import PopupState, {bindMenu, bindTrigger} from 'material-ui-popup-state';

const LatestSales = ({...props}) => {
  const theme = useTheme();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [toggle, setToggle] = useState('7 Days');

  const getData = async () => {
    try {
      setLoading(true);
      const res = await axios
          // eslint-disable-next-line max-len
          .get(`${process.env.REACT_APP_API_URL}/reports/last${uncapitalize(toggle)}`,
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

  useEffect(() => {
    getData();
    return () => {

    };
  }, [toggle]);

  const handleToggle = (toggle) => {
    setToggle(toggle);
  };

  const dataTable = {
    datasets: [
      {
        backgroundColor: '#3F51B5',
        barPercentage: 0.5,
        barThickness: 12,
        borderRadius: 4,
        categoryPercentage: 0.5,
        data: data.map((invoice) => Object.values(invoice)?.[0]),
        label: 'This year',
        maxBarThickness: 10,
      },
      {
        backgroundColor: '#EEEEEE',
        barPercentage: 0.5,
        barThickness: 12,
        borderRadius: 4,
        categoryPercentage: 0.5,
        data: data.map((invoice) => Object.values(invoice)?.[1]),
        label: 'Last year',
        maxBarThickness: 10,
      },
    ],
    labels: data.map((invoice) => Object.keys(invoice)?.[0]),
  };

  const options = {
    animation: false,
    cornerRadius: 20,
    layout: {padding: 0},
    legend: {display: false},
    maintainAspectRatio: false,
    responsive: true,
    xAxes: [
      {
        ticks: {
          fontColor: theme.palette?.text?.secondary,
        },
        gridLines: {
          display: false,
          drawBorder: false,
        },
      },
    ],
    yAxes: [
      {
        ticks: {
          fontColor: theme.palette?.text?.secondary,
          beginAtZero: true,
          min: 0,
        },
        gridLines: {
          borderDash: [2],
          borderDashOffset: [2],
          color: theme.palette.divider,
          drawBorder: false,
          zeroLineBorderDash: [2],
          zeroLineBorderDashOffset: [2],
          zeroLineColor: theme.palette?.divider,
        },
      },
    ],
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

  return (
    <Card sx={{height: '100%'}} elevation={3} {...props}>
      <CardHeader
        action={(
          <PopupState variant="popover" popupId="demo-popup-menu">
            {(popupState) => {
              return (
                <>
                  <Button
                    disabled={loading}
                    endIcon={<ArrowDropDown fontSize="small" />}
                    size="small"
                    {...bindTrigger(popupState)}
                  >
                    Last {toggle}
                  </Button>
                  <Menu
                    id="basic-menu"
                    {...bindMenu(popupState)}
                    onClose={popupState.close}
                    MenuListProps={{
                      'aria-labelledby': 'basic-button',
                    }}
                  >
                    <MenuItem onClick={()=> {
                      handleToggle('7 Days');
                      popupState.close();
                    }}>
                      Last 7 days
                    </MenuItem>
                    <MenuItem onClick={()=> {
                      handleToggle('30 Days');
                      popupState.close();
                    }}>
                      Last 30 days
                    </MenuItem>
                    <MenuItem onClick={()=> {
                      handleToggle('90 Days');
                      popupState.close();
                    }}>
                      Last 90 days
                    </MenuItem>
                  </Menu>
                </>
              );
            }}
          </PopupState>
        )}
        title="Latest Sales"
      />
      <Divider />
      {loading ?
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
       </Box> :
      <CardContent>
        <Box
          sx={{
            height: 400,
            position: 'relative',
          }}
        >
          <Bar
            data={dataTable}
            options={options}
          />
        </Box>
      </CardContent>
      }
      <Divider />
    </Card>
  );
};

LatestSales.propTypes = {
  props: PropTypes.object,
};

export default React.memo(LatestSales);
