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
  Switch,
  TablePagination,
  TextField,
  Typography,
} from '@mui/material';
import {HotTable} from '@handsontable/react';
import {
  Close,
  FileDownload,
  FilterList,
  Loop,
  TableRows,
  ViewColumn,
  ViewHeadline,
  ViewStream,
} from '@mui/icons-material';
import {FormContainer} from '../layout';
import {uuid} from '../helper';

const defaultData = [
  // eslint-disable-next-line max-len
  {name: 'Ted Right', a: 'a', b: 'b', c: 'c', d: 'd', e: 'e', f: 'f', g: 'g', h: 'h', i: 'i', j: 'j', k: 'k', l: 'l', m: 'm', n: 'n', o: 'o', p: 'p', q: 'q', r: 'r', s: 's', t: 't', u: 'u', v: 'v', w: 'w', x: 'x', y: 'y', z: 'z'},
  {name: 'Frank Honest', a: 'a'},
  {name: 'Joan Well', a: 'a'},
  {name: 'Gail Polite', a: 'a'},
  {name: 'Michael Fair', a: 'a'},
  {name: 'Michael Fair', a: 'a'},
  {name: 'Michael Fair', a: 'a'},
];

const BasicTable = ({data = defaultData}) => {
  // const [pageSize, setPageSize] = useState(20);
  const [anchorCol, setAnchorCol] = React.useState(null);
  const [anchorFil, setAnchorFil] = React.useState(null);
  const [anchorDen, setAnchorDen] = React.useState(null);
  // eslint-disable-next-line no-unused-vars
  const [hiddenCol, setHiddenCol] = React.useState([]);
  const [filter, setFilter] = React.useState('');
  const openCol = Boolean(anchorCol);
  const openFil = Boolean(anchorFil);
  const openDen = Boolean(anchorDen);
  const handleClickCol = (event) => {
    setAnchorCol(event.currentTarget);
  };
  const handleCloseCol = () => {
    setAnchorCol(null);
  };
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

  const buildColHeaders = (data) => {
    // find the first keys in the data
    const keys = Object.keys(data[0]);
    return keys;
  };

  const filteredColHeaders = (data) => {
    const filteredData = buildColHeaders(data).filter((item) => item
        .toLowerCase().includes(filter.toLowerCase()));
    return filteredData;
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
        <Button
          variant="text"
          startIcon={<ViewColumn/>}
          onClick={handleClickCol}
        >
          Columns
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorCol}
          open={openCol}
          onClose={handleCloseCol}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          <Box
            sx={{px: '8px', paddingBottom: '8px'}}
          >
            <TextField
              label="Find Column"
              variant="standard"
              size="small"
              fullWidth
              // onChange = filter buildColHeaders(data)
              onChange={(e)=> {
                setFilter(e.target.value);
              }}
            />
          </Box>
          {filteredColHeaders(data).map((item, index) => {
            return (
              <Box
                key={uuid()}
                sx={{
                  display: 'flex',
                  gap: '3px',
                  alignItems: 'center',
                  minWidth: '300px',
                }}
              >
                {/* switch checked if hiddenCol contains the same index */}
                <Switch checked={!hiddenCol.includes(index)} onChange={() => {
                  // if hiddenCol contains the same index, remove it
                  if (hiddenCol.includes(index)) {
                    const newHiddenCol = [...hiddenCol];
                    newHiddenCol.splice(hiddenCol.indexOf(index), 1);
                    setHiddenCol(newHiddenCol);
                    return;
                  }
                  const newHiddenCol = [...hiddenCol];
                  newHiddenCol.push(index);
                  setHiddenCol(newHiddenCol);
                }} />
                <Typography> {item} </Typography>
              </Box>
            );
          })}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              px: '8px',
            }}
          >
            <Button
              variant="text"
              onClick={()=> {
                const x = [];
                buildColHeaders(data).map((item, index) => {
                  x.push(index);
                });
                setHiddenCol(x);
              }}
            >
              Hide All
            </Button>
            <Button
              variant="text"
              onClick={()=> setHiddenCol([])}
            >
              Show All
            </Button>
          </Box>
        </Menu>
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
                inputProps={{
                  name: 'age',
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
                  <InputAdornment position="end"> <Loop/> </InputAdornment>,
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
        data={data}
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
