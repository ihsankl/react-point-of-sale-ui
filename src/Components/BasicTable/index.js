import React, {} from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Menu,
  MenuItem,
  TablePagination,
} from '@mui/material';
import {HotTable} from '@handsontable/react';
import {
  FileDownload,
  TableRows,
  ViewHeadline,
  ViewStream,
} from '@mui/icons-material';
import ShowHideColumns from './ShowHideColumns';
import Filter from './Filter';

const defaultData = [
  // eslint-disable-next-line max-len
  {name: 'Ted Right', a: 'a'},
  {name: 'Frank Honest', a: 'a'},
  {name: 'Joan Well', a: 'a'},
  {name: 'Gail Polite', a: 'a'},
  {name: 'Michael Fair', a: 'a'},
  {name: 'Michael Fair', a: 'a'},
  {name: 'Michael Fair', a: 'a'},
];

const BasicTable = ({data = defaultData}) => {
  // const [pageSize, setPageSize] = useState(20);
  const [anchorDen, setAnchorDen] = React.useState(null);
  const [filOperator, setFilOperator] = React.useState('contains');
  const [filColum, setFilColum] = React.useState('name');
  const [filter, setFilter] = React.useState('');
  const [hiddenCol, setHiddenCol] = React.useState([]);
  const openDen = Boolean(anchorDen);

  const handleClickDen = (event) => {
    setAnchorDen(event.currentTarget);
  };
  const handleCloseDen = () => {
    setAnchorDen(null);
  };

  const buildColHeaders = (param) => {
    const keys = Object.keys(param[0]);
    return keys;
  };

  const filteredData = (param) => {
    switch (filOperator) {
      case 'contains':
        return param.filter((item) => item[filColum]
            ?.toLowerCase().includes(filter?.toLowerCase()));
      case 'equals':
        return param.filter((item) => item[filColum]
            ?.toLowerCase() === filter?.toLowerCase());
      case 'startsWith':
        return param.filter((item) => item[filColum]
            ?.toLowerCase().startsWith(filter?.toLowerCase()));
      case 'endsWith':
        return param.filter((item) => item[filColum]
            ?.toLowerCase().endsWith(filter?.toLowerCase()));
      default:
        return param;
    }
  };

  return (
    <Box sx={{
      width: '100%',
      boxSizing: 'border-box',
      height: '100%',
      border: '1px solid #e0e0e0',
      borderRadius: '4px',
      padding: '.5em',
    }}>
      <Box sx={{display: 'flex', gap: '1em', pb: 1}}>
        <ShowHideColumns
          hiddenCol={hiddenCol}
          setHiddenCol={setHiddenCol}
          buildColHeaders={buildColHeaders}
          data={data}
        />
        <Filter
          setFilOperator={setFilOperator}
          setFilColum={setFilColum}
          setFilter={setFilter}
          buildColHeaders={buildColHeaders}
          data={data}
          filColum={filColum}
          filOperator={filOperator}
          filter={filter}
        />
        <Button
          variant="text"
          startIcon={<TableRows/>}
          onClick={handleClickDen}
        >
          Density
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorDen}
          open={openDen}
          onClose={handleCloseDen}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          <MenuItem>
            <ViewHeadline color='action' sx={{marginRight: '8px'}} />
            Compact
          </MenuItem>
          <MenuItem>
            <TableRows color='action' sx={{marginRight: '8px'}} />
            Standart
          </MenuItem>
          <MenuItem>
            <ViewStream color='action' sx={{marginRight: '8px'}} />
            Comfortable
          </MenuItem>
        </Menu>
        <Button
          variant="text"
          startIcon={<FileDownload/>}
        >
          Export
        </Button>
      </Box>
      <HotTable
        style={{
          width: '100%',
        }}
        data={filteredData(data)}
        colHeaders={buildColHeaders(data)}
        rowHeaders={true}
        manualColumnResize={true}
        // set the colWidths to fit the Box
        stretchH='all'
        licenseKey="non-commercial-and-evaluation"
        columnSorting={true}
        readOnly
        hiddenColumns={{
          indicators: true,
          columns: hiddenCol,
        }}
      />
      <TablePagination
        component="div"
        count={100}
        page={1}
        onPageChange={null}
        rowsPerPage={10}
        onRowsPerPageChange={null}
      />
    </Box>
  );
};

BasicTable.propTypes = {
  colHeaders: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
};

export default BasicTable;
