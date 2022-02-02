import {Close, FilterList, Loop} from '@mui/icons-material';
import {
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  Menu,
  NativeSelect,
  TextField,
} from '@mui/material';
import React, {Fragment, useState} from 'react';
import {uuid} from '../../helper';
import {FormContainer} from '../../layout';
import PropTypes from 'prop-types';
import PopupState, {bindMenu, bindTrigger} from 'material-ui-popup-state';

const Filter = ({
  setFilOperator,
  filOperator,
  setFilColum,
  filColum,
  setFilter,
  buildColHeaders,
  data,
  filter,
  ...props
}) => {
  const [filterLoading, setFilterLoading] = useState(false);
  const [mount, setMount] = useState(false);

  return (
    <PopupState variant="popover" popupId="demo-popup-menu">
      {(popupState) => {
        if (popupState.isOpen) {
          if (typeof data === 'object' && data.length > 0 && !mount) {
            const keys = Object.keys(data[0]);
            setFilColum(keys[0]);
            setFilOperator('contains');
            setMount(true);
          }
        }

        if (!popupState.isOpen) {
          setMount(false);
        }

        return (<Fragment>
          <Button
            {...props}
            variant="text"
            startIcon={<FilterList/>}
            {...bindTrigger(popupState)}
          >
              Filter
          </Button>
          <Menu
            {...bindMenu(popupState)}
            id="basic-menu"
            onClose={popupState.close}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <FormContainer
              key={uuid()}
              onSubmit={(e) => e.preventDefault()}
              sx={{
                display: 'flex',
                flexDirection: 'row',
                gap: 0,
              }}
            >
              <IconButton
                onClick={() => {
                  setFilOperator('contains');
                  setFilColum(buildColHeaders(data)[0]);
                  setFilter('');
                }}
              >
                <Close/>
              </IconButton>
              <FormControl sx={{minWidth: 150}}>
                <InputLabel variant="standard" htmlFor="filColumn">
              &#8288;Columns
                </InputLabel>
                <NativeSelect
                  inputProps={{
                    name: 'filColumn',
                    id: 'filColumn',
                  }}
                  value={filColum}
                  onChange={(e) => {
                    setFilColum(e.target.value);
                  }}
                >
                  {buildColHeaders(data).map((item, index) =>
                    (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ),
                  )}
                </NativeSelect>
              </FormControl>
              <FormControl sx={{minWidth: 150}}>
                <InputLabel variant="standard" htmlFor="operator">
                  Operator
                </InputLabel>
                <NativeSelect
                  onChange={(e) => setFilOperator(e.target.value)}
                  value={filOperator}
                  inputProps={{
                    name: 'operator',
                    id: 'operator',
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
              <FormControl
                sx={{
                  minWidth: 150,
                  marginRight: '8px',
                }}
              >
                {filOperator !== 'isEmpty' && filOperator !== 'isNotEmpty' && (
                  <TextField
                    variant="standard"
                    autoFocus
                    value={filter}
                    label="Value"
                    placeholder='Filter value'
                    InputProps={{
                      endAdornment:
                      filterLoading &&
                      <InputAdornment position="end">
                        <Loop color='action' />
                      </InputAdornment>,
                    }}
                    onChange={(e) => {
                      setFilterLoading(true);
                      setFilter(e.target.value);
                      setTimeout(() => {
                        setFilterLoading(false);
                      }, 1000);
                    }}
                  />
                )}
              </FormControl>
            </FormContainer>
          </Menu>
        </Fragment>);
      }}
    </PopupState>
  );
};

Filter.propTypes = {
  setFilOperator: PropTypes.func.isRequired,
  setFilColum: PropTypes.func.isRequired,
  setFilter: PropTypes.func.isRequired,
  buildColHeaders: PropTypes.func.isRequired,
  data: PropTypes.array.isRequired,
  filColum: PropTypes.string,
  filOperator: PropTypes.string.isRequired,
  filter: PropTypes.string.isRequired,
};

export default Filter;
