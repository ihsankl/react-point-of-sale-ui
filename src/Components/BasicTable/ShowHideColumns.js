import {ViewColumn} from '@mui/icons-material';
import {Button, Menu, Switch, TextField, Typography} from '@mui/material';
import {Box} from '@mui/system';
import React, {useState} from 'react';
import {uuid} from '../../helper';
import PropTypes from 'prop-types';

const ShowHideColumns = ({hiddenCol, setHiddenCol, buildColHeaders, data}) => {
  const [anchorCol, setAnchorCol] = useState(null);
  const [filter, setFilter] = useState('');

  const openCol = Boolean(anchorCol);

  const handleClickCol = (event) => {
    setAnchorCol(event.currentTarget);
  };
  const handleCloseCol = () => {
    setAnchorCol(null);
  };

  const filteredColHeaders = (cols) => {
    const filteredData = buildColHeaders(cols).filter((item) => item
        .toLowerCase().includes(filter.toLowerCase()));
    return filteredData;
  };

  return (
    <>
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
              <Switch checked={!hiddenCol.includes(index)} onChange={() => {
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
    </>
  );
};

ShowHideColumns.propTypes = {
  hiddenCol: PropTypes.array,
  setHiddenCol: PropTypes.func,
  buildColHeaders: PropTypes.func,
  data: PropTypes.array,
};

export default ShowHideColumns;
