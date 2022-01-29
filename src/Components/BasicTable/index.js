/* eslint-disable */
import React, {} from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Menu,
  MenuItem,
  Pagination,
} from '@mui/material';
import {HotTable} from '@handsontable/react';
import {
  FileDownload,
  TableRows,
  ViewHeadline,
  ViewStream,
  BrowserNotSupported,
} from '@mui/icons-material';
import ShowHideColumns from './ShowHideColumns';
import Filter from './Filter';

const defaultData = [
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
  const [filOperator, setFilOperator] = React.useState('');
  const [filColum, setFilColum] = React.useState('');
  const [density, setDensity] = React.useState(35);
  const [filter, setFilter] = React.useState('');
  const [hiddenCol, setHiddenCol] = React.useState([]);
  const hot = React.useRef(null);
  const openDen = Boolean(anchorDen);

  const handleClickDen = (event) => {
    setAnchorDen(event.currentTarget);
  };
  const handleCloseDen = () => {
    setAnchorDen(null);
  };

  const buildColHeaders = (param) => {
    if (typeof param === 'object' && param.length > 0) {
      const keys = Object.keys(param[0]);
      return keys;
    }
    return param;
  };

  const filteredData = (param) => {
    switch (filOperator) {
      case 'contains':
        return param.filter((item) => item[filColum]?.toString()
            ?.toLowerCase().includes(filter?.toLowerCase()));
      case 'equals':
        return param.filter((item) => item[filColum]?.toString()
            ?.toLowerCase() === filter?.toLowerCase());
      case 'startsWith':
        return param.filter((item) => item[filColum]?.toString()
            ?.toLowerCase().startsWith(filter?.toLowerCase()));
      case 'endsWith':
        return param.filter((item) => item[filColum]?.toString()
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
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <Box sx={{display: 'flex', gap: '1em', pb: 1, alignSelf: 'flex-start'}}>
        <ShowHideColumns
          hiddenCol={hiddenCol}
          setHiddenCol={setHiddenCol}
          buildColHeaders={buildColHeaders}
          data={data}
          disabled={!data.length}
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
          disabled={!data.length}
        />
        <Button
          variant="text"
          startIcon={<TableRows/>}
          onClick={handleClickDen}
          disabled={!data.length}
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
          <MenuItem onClick={() => {
            setDensity(35);
            handleCloseDen();
          }} >
            <ViewHeadline color='action' sx={{marginRight: '8px'}} />
            Compact
          </MenuItem>
          <MenuItem onClick={() => {
            setDensity(51);
            handleCloseDen();
          }} >
            <TableRows color='action' sx={{marginRight: '8px'}} />
            Standart
          </MenuItem>
          <MenuItem onClick={() => {
            setDensity(66);
            handleCloseDen();
          }} >
            <ViewStream color='action' sx={{marginRight: '8px'}} />
            Comfortable
          </MenuItem>
        </Menu>
        <Button
          disabled={!data.length}
          variant="text"
          startIcon={<FileDownload/>}
          onClick={() => {
            if (data.length > 0) {
              hot.current
                  .hotInstance
                  .getPlugin('exportFile').downloadFile('csv', {
                    bom: false,
                    columnDelimiter: ',',
                    columnHeaders: false,
                    exportHiddenColumns: true,
                    exportHiddenRows: true,
                    fileExtension: 'csv',
                    filename: 'Handsontable-CSV-file_[YYYY]-[MM]-[DD]',
                    mimeType: 'text/csv',
                    rowDelimiter: '\r\n',
                    rowHeaders: true,
                  });
            }
          }}
        >
          Export
        </Button>
      </Box>
      {data.length > 0 ? (
        <HotTable
          style={{
            width: '98%',
          }}
          dropdownMenu={['filter_by_condition', 'filter_action_bar']}
          className='htCenter htMiddle'
          ref={hot}
          filters={true}
          data={filteredData(data)}
          colHeaders={buildColHeaders(data)}
          rowHeaders={true}
          manualColumnResize={true}
          manualRowResize={true}
          rowHeights={density}
          stretchH='all'
          licenseKey="non-commercial-and-evaluation"
          columnSorting={true}
          readOnly
          hiddenColumns={{
            indicators: true,
            columns: hiddenCol,
          }}
        />
      ):
        <Box sx={{
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <BrowserNotSupported color='action' sx={{marginRight: '8px'}} />
          No data
        </Box>
      }
      <Pagination
        sx={{
          alignSelf: 'flex-end',
          py: '1em',
        }}
        count={10}
        showFirstButton
        showLastButton
        // count
        // onChange
        // page

      />
    </Box>
  );
};

BasicTable.propTypes = {
  data: PropTypes.array.isRequired,
};

export default BasicTable;
