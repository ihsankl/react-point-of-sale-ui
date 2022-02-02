import {TextField, Button} from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';
import {useNavigate} from 'react-router-dom';
import {FormContainer, FormControlContainer} from '../layout';

const BasicInput = ({isUpdate, fields, onSubmit, children}) => {
  const navigate = useNavigate();

  return (<>
    <FormContainer onSubmit={(e) => {
      e.preventDefault();
      onSubmit(e);
    }}>
      <FormControlContainer>
        {fields.map((field, index) => {
          return (
            <TextField
              autoFocus={index === 0}
              error={field.error}
              key={index}
              id={field.id}
              label={field.label}
              name={field.id}
              value={field.value}
              variant="outlined"
              fullWidth
              onChange={field.onChange}
              helperText={field.helperText}
              onKeyPress={(e) => {
                if (field.id === 'product_code') {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                  }
                }
              }}
            />
          );
        })}
      </FormControlContainer>
      {children}
      <div style={{
        display: 'flex',
        gap: '.5em',
        width: 'clamp(35em, 50%, 80%)',
      }}>
        <Button
          sx={{width: '50%'}}
          variant="contained"
          color="primary"
          type="submit"
        >
          {isUpdate ? 'Update' : 'Create'}
        </Button>
        <Button
          sx={{width: '50%'}}
          variant="contained"
          color="primary"
          onClick={
            ()=> navigate(-1)
          }
        >
          {'Cancel'}
        </Button>
      </div>
    </FormContainer>
  </>);
};

BasicInput.propTypes = {
  fields: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    value: PropTypes.any.isRequired,
    onChange: PropTypes.func.isRequired,
    helperText: PropTypes.string,
    error: PropTypes.bool,
  })).isRequired,
  onSubmit: PropTypes.func.isRequired,
  isUpdate: PropTypes.bool,
  children: PropTypes.node,
};

export default BasicInput;
