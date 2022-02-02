import {ViewColumn} from '@mui/icons-material';
import {Button, Menu, Switch, TextField, Typography} from '@mui/material';
import {Box} from '@mui/system';
import React, {Fragment, useState} from 'react';
import {uuid} from '../../helper';
import PropTypes from 'prop-types';
import PopupState, {bindMenu, bindTrigger} from 'material-ui-popup-state';

const ShowHideColumns = ({
  hiddenCol,
  setHiddenCol,
  buildColHeaders,
  data,
  ...props
}) => {
  const [filter, setFilter] = useState('');

  const filteredColHeaders = (cols) => {
    const filteredData = buildColHeaders(cols).filter((item) => item
        .toLowerCase().includes(filter.toLowerCase()));
    return filteredData;
  };

  return (
    <PopupState variant="popover" popupId="demo-popup-menu">
      {(popupState) => {
        return (
          <Fragment>
            <Button
              variant="text"
              startIcon={<ViewColumn/>}
              {...bindTrigger(popupState)}
              {...props}
            >
            Columns
            </Button>
            <Menu
              id="basic-menu"
              {...bindMenu(popupState)}
              onClose={popupState.close}
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
                    <Switch
                      checked={!hiddenCol.includes(index)}
                      onChange={() => {
                        if (hiddenCol.includes(index)) {
                          const tempHiddenCol = [...hiddenCol];
                          tempHiddenCol.splice(hiddenCol.indexOf(index), 1);
                          setHiddenCol(tempHiddenCol);
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
                    const temp = [];
                    buildColHeaders(data).map((item, index) => {
                      temp.push(index);
                    });
                    setHiddenCol(temp);
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
          </Fragment>
        );
      }}
    </PopupState>
  );
};

ShowHideColumns.propTypes = {
  hiddenCol: PropTypes.array,
  setHiddenCol: PropTypes.func,
  buildColHeaders: PropTypes.func,
  data: PropTypes.array,
};

export default ShowHideColumns;
