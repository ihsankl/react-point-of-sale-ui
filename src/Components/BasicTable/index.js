import React, {} from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  Menu,
  MenuItem,
  NativeSelect,
  TablePagination,
  TextField,
} from '@mui/material';
import {HotTable} from '@handsontable/react';
import {
  Close,
  FileDownload,
  FilterList,
  Loop,
  TableRows,
  ViewHeadline,
  ViewStream,
} from '@mui/icons-material';
import {FormContainer} from '../../layout';
import {uuid} from '../../helper';
import ShowHideColumns from './ShowHideColumns';

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
  const [anchorFil, setAnchorFil] = React.useState(null);
  const [anchorDen, setAnchorDen] = React.useState(null);
  const [filOperator, setFilOperator] = React.useState('contains');
  const [filColum, setFilColum] = React.useState('name');
  const [filter, setFilter] = React.useState('');
  const [filterLoading, setFilterLoading] = React.useState(false);
  const [hiddenCol, setHiddenCol] = React.useState([]);
  const openFil = Boolean(anchorFil);
  const openDen = Boolean(anchorDen);

  const handleClickFil = (event) => {
    setAnchorFil(event.currentTarget);
  };
  const handleCloseFil = () => {
    setAnchorFil(null);
  };
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
        <Button
          variant="text"
          startIcon={<FilterList/>}
          onClick={handleClickFil}
        >
          Filter
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorFil}
          open={openFil}
          onClose={handleCloseFil}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          <FormContainer
            sx={{
              display: 'flex',
              flexDirection: 'row',
              gap: 0,
            }}
          >
            <IconButton>
              <Close/>
            </IconButton>
            <FormControl sx={{minWidth: 150}}>
              <InputLabel variant="standard" htmlFor="uncontrolled-native">
              Columns
              </InputLabel>
              <NativeSelect
                value={filColum}
                onChange={(e) => {
                  setFilColum(e.target.value);
                }}
                inputProps={{
                  name: 'age',
                  id: 'uncontrolled-native',
                }}
              >
                {buildColHeaders(data).map((item, index) => {
                  return (
                    <option key={uuid()} value={item}>
                      {item}
                    </option>
                  );
                })}
              </NativeSelect>
            </FormControl>
            <FormControl sx={{minWidth: 150}}>
              <InputLabel variant="standard" htmlFor="uncontrolled-native">
              Operator
              </InputLabel>
              <NativeSelect
                onChange={(e) => setFilOperator(e.target.value)}
                inputProps={{
                  name: 'operator',
                  id: 'uncontrolled-native',
                }}
              >
                <option value="contains">contains</option>
                <option value="equals">equals</option>
                <option value="startsWith">starts with</option>
                <option value="endsWith">ends with</option>
                <option value="isEmpty">is empty</option>
                <option value="isNotEmpty">is not empty</option>
              </NativeSelect>
            </FormControl>
            <FormControl sx={{minWidth: 150, marginRight: '8px'}}>
              <TextField
                autoFocus
                id="standard-basic"
                label="Value"
                placeholder='Filter value'
                variant="standard"
                InputProps={{
                  endAdornment:
                  filterLoading &&
                  <InputAdornment position="end">
                    <Loop color='action' />
                  </InputAdornment>,
                }}
                onChange={(e) => {
                  setFilterLoading(true);
                  setTimeout(() => {
                    setFilter(e.target.value);
                    setFilterLoading(false);
                  }, 1000);
                }}
              />
            </FormControl>
          </FormContainer>
        </Menu>
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
