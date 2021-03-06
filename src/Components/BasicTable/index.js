import {DataGrid, GridToolbar} from '@mui/x-data-grid';
import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {Box} from '@mui/material';

const columns = [
  {field: 'id', headerName: 'ID', width: 90},
  {
    field: 'firstName',
    headerName: 'First name',
    width: 150,
    editable: false,
  },
  {
    field: 'lastName',
    headerName: 'Last name',
    width: 150,
    editable: false,
  },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 110,
    editable: false,
  },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (params) =>
      `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  },
  {
    field: 'action',
    headerName: 'Action',
    width: 100,
    editable: false,
    cellRenderer: (params) => {
      return (
        <button
          onClick={() => {
            console.log(params.data);
          }}
        >
          {'Edit'}
        </button>
      );
    },
  },
];

const rows = [
  {id: 1, lastName: 'Snow', firstName: 'Jon', age: 35},
  {id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42},
  {id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45},
  {id: 4, lastName: 'Stark', firstName: 'Arya', age: 16},
  {id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null},
  {id: 6, lastName: 'Melisandre', firstName: null, age: 150},
  {id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44},
  {id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36},
  {id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65},
];

const BasicTable = ({dataRows = rows, dataColumns = columns}) => {
  const [pageSize, setPageSize] = useState(20);
  return (
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
        rows={dataRows}
        columns={dataColumns}
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
  );
};

BasicTable.propTypes = {
  dataRows: PropTypes.array.isRequired,
  dataColumns: PropTypes.array.isRequired,
};

export default BasicTable;
