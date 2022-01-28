/* eslint-disable */
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
import React from 'react';
import {uuid} from '../../helper';
import {FormContainer} from '../../layout';
import PropTypes from 'prop-types';

const Filter = ({
  setFilOperator,
  filOperator,
  setFilColum,
  filColum,
  setFilter,
  buildColHeaders,
  data,
  filter,
}) => {
  const [anchorFil, setAnchorFil] = React.useState(null);
  // eslint-disable-next-line no-unused-vars
  const [filterLoading, setFilterLoading] = React.useState(false);

  const openFil = Boolean(anchorFil);

  const handleClickFil = (event) => {
    setAnchorFil(event.currentTarget);
  };
  const handleCloseFil = () => {
    setAnchorFil(null);
  };

  return (
    <>
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
                )
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
          </FormControl>
        </FormContainer>
      </Menu>
    </>
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
