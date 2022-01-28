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
