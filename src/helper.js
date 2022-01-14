import {DeleteOutline, Edit} from '@mui/icons-material';
import {IconButton} from '@mui/material';
import dayjs from 'dayjs';
import React from 'react';
/**
 * replace _ with space
 * capitalize first letter for each word
 * @param {string} str The string you want to capitalize.
 * @return {string} The result.
 */
export const capitalize = (str) => {
  return str.replace(/_/g, ' ').replace(/\w\S*/g, function(txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
};

/**
 * remove the last occurence of /word
 * @param {string} str The string you want to process.
 * @return {string} The result.
 */
export const removeLastSlash = (str) => {
  return str.replace(/\/[^\/]*$/, '');
};

// headers builder
// eslint-disable-next-line max-len
export const headersBuilder = (token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJhZG1pbiIsInBhc3N3b3JkIjoiJDJiJDEwJElYdmdSZ1RjUGFUYmlUbmN0ZmZJRGU1VFJveXdzcHZZdUZmeW1VOHFFeXNuTWhMWDhNa2RHIiwiZnVsbG5hbWUiOiItIiwicm9sZSI6ImFkbWluIiwiY29udGFjdCI6Ii0iLCJpYXQiOjE2NDIxMTY1NTEsImV4cCI6MTY0MjIwMjk1MX0.CwluhrasCii2wIXvTa2c8KN74N-Iyqmv5wkmjrifzAw') => {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

/**
 * options builder for material autocomplete component
 * @param {object} data data to show.
 * @return {object} The result.
 */
export const optionsBuilder = (data) => {
  return data.map((item) => {
    return {
      value: item,
      label: item,
    };
  });
};

/**
 * basic redux reducers
 * @param {object} state state of the reducer.
 * @param {object} action action of the reducer.
 * @param {string} asyncState the type of async action.
 */
export const createBasicReducer = (state, action, asyncState) => {
  switch (asyncState) {
    case 'PENDING':
      state.isLoading = true;
      state.error = {
        message: null,
        state: false,
      };
      state.isSuccess = false;
      break;
    case 'FULFILLED':
      state.isLoading = false;
      state.error = {
        message: null,
        state: false,
      };
      state.isSuccess = true;
      state.data = action.payload;
      break;
    case 'REJECTED':
      state.isLoading = false;
      state.error = {
        message: action.payload.response.data.message ?? '',
        state: true,
      };
      state.isSuccess = false;
  }
};

// initial state for all reducers
export const initialState = {
  isLoading: false,
  error: {
    state: false,
    message: '',
  },
  isSuccess: false,
  data: null,
};

/**
 * columns builder
 * @param {object} data datasource.
 * @param {function} editCb callback function for edit button.
 * @param {function} deleteCb callback function for delete button.
 * @return {object} The result.
 */
export const columnsBuilder = (data, editCb, deleteCb) => {
  const columnsArr = [];
  for (const property in data) {
    if (Object.prototype.hasOwnProperty.call(data, property)) {
      columnsArr.push({
        field: property,
        headerName: capitalize(property),
        sortable: true,
        editable: false,
        width: 200,
        valueGetter: (params)=> dateFormatter(params.row[property]),
      });
    }
  }
  columnsArr.push({
    field: 'actions',
    headerName: 'Actions',
    sortable: true,
    editable: false,
    width: 150,
    renderCell: (params) => {
      return (
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <IconButton
            onClick={()=>editCb(params.row?.id)}
            color="inherit"
          >
            <Edit />
          </IconButton>
          <IconButton
            onClick={()=> deleteCb(params.row?.id)}
            color="inherit"
          >
            <DeleteOutline />
          </IconButton>
        </div>
      );
    },
  });
  return columnsArr;
};

// look if the value string is following the date pattern
// then change date value into YYYY-MM-DD format
export const dateFormatter = (value) => {
  // example of date string = 2022-01-13T17:00:00.000Z
  const pattern = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/;

  if (pattern.test(value)) {
    return dayjs(value).format('YYYY-MM-DD');
  }
  return value;
};
