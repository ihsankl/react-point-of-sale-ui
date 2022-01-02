import {FormControl, TextField, Button} from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';
import {styled} from '@mui/material/styles';

const FormContainer = styled('form')(({theme}) => ({
  ...theme.typography.body1,
  gap: '1em',
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
}));

const BasicInput = ({isUpdate, fields, onSubmit}) => {
  return (<>
    <FormControl sx={{width: '50%'}}>
      <FormContainer onSubmit={(e) => e.preventDefault()}>
        {fields.map((field, index) => {
          return (
            <TextField
              key={index}
              id={field.id}
              label={field.label}
              value={field.value}
              variant="outlined"
              fullWidth
              onChange={field.onChange}
            />
          );
        })}
        {/* button submit */}
        <Button
          sx={{width: '25em'}}
          variant="contained"
          color="primary"
          type="submit"
          onClick={onSubmit}
        >
          {isUpdate ? 'Update' : 'Create'}
        </Button>
      </FormContainer>
    </FormControl>
  </>);
};

BasicInput.propTypes = {
  fields: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    value: PropTypes.any,
    onChange: PropTypes.func.isRequired,
  })).isRequired,
  onSubmit: PropTypes.func.isRequired,
  isUpdate: PropTypes.bool,
};

export default BasicInput;
