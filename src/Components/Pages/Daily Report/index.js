import {CircularProgress} from '@mui/material';
import {Box} from '@mui/system';
import {DataGrid, GridToolbar} from '@mui/x-data-grid';
import axios from 'axios';
import React from 'react';
import {headersBuilder, rupiahFormatter} from '../../../helper';
import {PaperContainer, TitleWithDivider} from '../../../layout';

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
  },
];

const DailyReport = () => {
  const [data, setData] = React.useState([]);
  const [pageSize, setPageSize] = React.useState(20);
  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = React.useState(false);
  const [total, setTotal] = React.useState(0);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    if (!mounted && data.length === 0) {
      getDailyReport();
      setMounted(true);
    }

    return () => {

    };
  }, [mounted]);

  const getDailyReport = async () => {
    try {
      setLoading(true);
      // eslint-disable-next-line max-len
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/reports/daily`, {
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
              height: '500px',
            }}
          >
            <CircularProgress sx={{width: '100%', height: '100%'}} />
          </Box>
        ):(
        <Box
          sx={{
            minHeight: '800px',
            maxHeight: '1000px',
            height: 'calc(100vh - 200px)',
          }}
        >
          <DataGrid
            sx={{minWidth: '500px'}}
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
        </Box>
        )}
        <h2>Total: {rupiahFormatter(total)}</h2>
        {/* eslint-disable-next-line max-len */}
      </PaperContainer>
    </>
  );
};

export default DailyReport;
