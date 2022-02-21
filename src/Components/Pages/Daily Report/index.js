import {DesktopDatePicker, LocalizationProvider} from '@mui/lab';
import {Button, CircularProgress, TextField} from '@mui/material';
import {Box} from '@mui/system';
import {DataGrid, GridToolbar} from '@mui/x-data-grid';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {headersBuilder, rupiahFormatter} from '../../../helper';
import {
  FormControlContainer,
  PaperContainer,
  TitleWithDivider,
} from '../../../layout';
import DateAdapter from '@mui/lab/AdapterDayjs';
import dayjs from 'dayjs';

const columns = [
  {
    field: 'id',
    headerName: 'ID',
    flex: 1,
  },
  {
    field: 'product_name',
    headerName: 'Product',
    flex: 1,
    editable: false,
  },
  {
    field: 'qty',
    headerName: 'Quantity',
    flex: 1,
    editable: false,
  },
  {
    field: 'sub_total',
    headerName: 'Sub Total',
    flex: 1,
    editable: false,
    valueGetter: (params) => rupiahFormatter(params.row.sub_total),
  },
];

const DailyReport = () => {
  const [data, setData] = useState([]);
  const [pageSize, setPageSize] = useState(20);
  const [loading, setLoading] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [total, setTotal] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    if (!mounted && data.length === 0) {
      getDailyReport();
      setMounted(true);
    }

    return () => {

    };
  }, [mounted]);

  const getDailyReport = async () => {
    try {
      const formattedDate = dayjs(date).format('YYYY-MM-DD');
      setLoading(true);
      // eslint-disable-next-line max-len
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/reports/daily?date=${formattedDate}`, {
        ...headersBuilder(),
      });
      if (res) {
        const temp = [...res.data.data.result];
        const newData = temp.map((val, ind) => {
          return {
            ...val,
            id: ind + 1,
          };
        });
        setData(newData);
        setTotal(res.data?.data?.total);
        setLoading(false);
      }
    } catch (error) {
      // TODO: handle error
      console.log(error.message);
      setLoading(false);
    }
  };

  return (
    <>
      <PaperContainer elevation={3} square>
        <TitleWithDivider>Daily Report</TitleWithDivider>
        {loading ? (
          <Box
            sx ={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              minHeight: '500px',
            }}
          >
            <CircularProgress sx={{width: '100%', height: '100%'}} />
          </Box>
        ):(
        <Box
          sx={{
            minHeight: '800px',
            maxHeight: '1000px',
            paddingTop: '1em',
          }}
        >
          <FormControlContainer
            sx={{
              my: '1em',
              minWidth: '500px',
              width: '30%',
            }}
          >
            <LocalizationProvider dateAdapter={DateAdapter}>
              <DesktopDatePicker
                label="Date"
                labelId="date_label"
                inputFormat="YYYY-MM-DD"
                name="date"
                mask='____-__-__'
                id="date"
                value={date}
                onChange={(e) => setDate(e)}
                renderInput={(params) =>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                    }}
                  >
                    <TextField
                      variant="filled"
                      sx={{
                        flex: 1,
                        borderTopLeftRadius: '0',
                        borderBottomLeftRadius: '0',
                      }}
                      {...params}
                    />
                    <Button
                      variant='outlined'
                      sx={{
                        borderBottomLeftRadius: '0',
                        borderTopLeftRadius: '0',
                      }}
                      onClick={getDailyReport}
                    >
                      Filter
                    </Button>
                  </Box>
                }
              />
            </LocalizationProvider>
          </FormControlContainer>
          <DataGrid
            sx={{minWidth: '500px', minHeight: '500px'}}
            components={{Toolbar: GridToolbar}}
            rows={data}
            columns={columns}
            pageSize={pageSize}
            rowsPerPageOptions={[5, 10, 20]}
            disableSelectionOnClick
            onPageSizeChange={(page) => {
              setPageSize(page);
            }}
            onRowEditCommit={(row) => {
              console.log(row); console.log('onRowEditCommit');
            }}
          />
          <h2>Total: {rupiahFormatter(total)}</h2>

        </Box>
        )}
      </PaperContainer>
    </>
  );
};

export default DailyReport;
