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
export const headersBuilder = (token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAxLCJ1c2VybmFtZSI6ImFkbWluIiwicGFzc3dvcmQiOiIkMmEkMTAkbExVZjB6QnBQZENQdGdGekkwQTU3dVRZRGYvSnlYTkhnc1lpUGFQNngzNjRsRmFVY2hvYmkiLCJmdWxsbmFtZSI6bnVsbCwicm9sZSI6ImFkbWluIiwiY29udGFjdCI6bnVsbCwiaWF0IjoxNjQyNTAzNTQ4LCJleHAiOjE2NDI1ODk5NDh9.4lZDB1b3m3JewWFObxNpTyurgygs0PFJABgoqQSlonU') => {
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
      label: item?.name,
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
        // set width based on content length
        width: 150,
        // hide every column containing id
        hide: property.includes('id') ? true : false,
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

// return true if the value is number
export const isNumber = (value) => {
  if (!value) return false;
  return !isNaN(value);
};

// create uuid
export const uuid = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = (Math.random() * 16) | 0;
    const v = c == 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

// rupiah formatter
export const rupiahFormatter = (value) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
  }).format(value);
};

// convert thounsand into K
export const thousandFormatter = (value) => {
  if (value < 1000) return value;
  if (value >= 1000 && value < 1000000) {
    return `${(value / 1000).toFixed(2)}K`;
  }
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(2)}M`;
  }
};

// random color for each data
export const randomColor = () => {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};

// this function is exclusive to Invoice State
// will break if the data is not Invoice State
export const getInvoices = (howLong, data) => {
  const today = dayjs();
  const subtractor = today.subtract(howLong, 'day');
  const invoices = data.filter((item) => {
    return dayjs(item.date_recorded).isBetween(subtractor, today);
  });
  return invoices;
};

// this function is exclusive to Sales State
// will break if the data is not Sales State
export const getSales = (invoice, data) => {
  const sales = data.filter(
      (sale) => invoice.some(
          (invoiceData) => invoiceData.id === sale.invoice_id,
      ),
  );
  return sales;
};
