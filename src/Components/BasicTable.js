import React, {} from 'react';
import PropTypes from 'prop-types';
import {Box} from '@mui/material';
import {HotTable} from '@handsontable/react';

const defaultColHeaders = true;

const defaultData = [
  {id: 1, name: 'Ted Right'},
  {id: 2, name: 'Frank Honest'},
  {id: 3, name: 'Joan Well'},
  {id: 4, name: 'Gail Polite'},
  {id: 5, name: 'Michael Fair'},
];

const BasicTable = ({colHeaders = defaultColHeaders, data = defaultData}) => {
  // const [pageSize, setPageSize] = useState(20);
  return (
    <Box sx={{
      background: 'red',
      width: '100%',
      height: '100%',
    }}>
      <HotTable
        style={{
          minWidth: '600px',
          maxWidth: '90%',
          width: '80%',
        }}
        data={data}
        colHeaders={colHeaders}
        rowHeaders={true}
        // colWidths={[100, 100, 100, 100, 500]}
        licenseKey="non-commercial-and-evaluation"
      />
    </Box>
  );
};

BasicTable.propTypes = {
  colHeaders: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
};

export default BasicTable;
