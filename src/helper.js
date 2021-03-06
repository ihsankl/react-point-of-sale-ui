import {DeleteOutline, Edit} from '@mui/icons-material';
import {Box, IconButton} from '@mui/material';
import dayjs from 'dayjs';
import React, {useEffect, useRef} from 'react';
import {renderCellExpand} from './Components/GridCellExpand';
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
export const headersBuilder = (token = localStorage.getItem('token')) => {
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
        message: action.payload.response?.data?.message ??
        'Something went wrong',
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
        minWidth: 100,
        flex: 1,
        // hide every column containing id
        hide: columnHidden(property),
        valueGetter: (params)=> valueFormatter(params.row[property], property),
        renderCell: renderCellExpand,
      });
    }
  }

  columnsArr.push({
    field: 'actions',
    headerName: 'Actions',
    sortable: true,
    editable: false,
    minWidth: 150,
    renderCell: (params) => {
      return (
        <Box
          sx={{
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
        </Box>
      );
    },
  });

  return columnsArr;
};

const columnHidden = (property) => {
  if (property.includes('id')) return true;
  if (property.includes('re_order_level')) return true;
  if (property.includes('disc_percentage')) return true;
  if (property.includes('customer')) return true;
  return false;
};


const valueFormatter = (value, property) => {
  if (property.includes('date')) return dayjs(value).format('DD MMM, YYYY');
  if (property === 'contact') return value;
  if (property.includes('total') ||
  property.includes('price') ||
  property.includes('amount') ||
  property.includes('additional_expenses')
  ) return rupiahFormatter(value);

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

// convert thousand into K
export const thousandFormatter = (value) => {
  if (value < 1000) return value;
  if (value >= 1000 && value < 1000000) {
    return `${(value / 1000).toFixed(2)}K`;
  }
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(2)}M`;
  }
  return 0;
};

// random color for each data
export const randomColor = () => {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};

// return month name based on number
export const monthName = (month) => {
  switch (month) {
    case '0':
      return 'January';
    case '1':
      return 'February';
    case '2':
      return 'March';
    case '3':
      return 'April';
    case '4':
      return 'May';
    case '5':
      return 'June';
    case '6':
      return 'July';
    case '7':
      return 'August';
    case '8':
      return 'September';
    case '9':
      return 'October';
    case '10':
      return 'Novemver';
    case '11':
      return 'December';
  }
};

// uncapitalize all letter of string
// remove whitespace
export const uncapitalize = (str) => {
  // eslint-disable-next-line max-len
  return str.replace(/\w\S*/g, (txt) => txt.charAt(0).toLowerCase() + txt.substr(1).toLowerCase()).replace(/\s/g, '');
};

/**
 * useInterval custom hook
 * @param {object} callback callback of the hook.
 * @param {function} delay delay of interval.
 */
export function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    const tick = () => {
      savedCallback.current();
    };
    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}
