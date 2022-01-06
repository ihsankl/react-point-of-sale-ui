import {TextField, Button} from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';
import {useNavigate, useLocation} from 'react-router-dom';
import {removeLastSlash} from '../helper';
import {FormContainer, FormControlContainer} from '../layout';

const BasicInput = ({isUpdate, fields, onSubmit, children}) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (<>
    <FormContainer onSubmit={(e) => e.preventDefault()}>
      <FormControlContainer>
        {fields.map((field, index) => {
          return (
            <TextField
              key={index}
              id={field.id}
              label={field.label}
              name={field.id}
              value={field.value}
              variant="outlined"
              fullWidth
              onChange={field.onChange}
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
          onClick={onSubmit}
        >
          {isUpdate ? 'Update' : 'Create'}
        </Button>
        <Button
          sx={{width: '50%'}}
          variant="contained"
          color="primary"
          onClick={
            ()=> navigate(removeLastSlash(location.pathname),
                {state: {from: location}})
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
  })).isRequired,
  onSubmit: PropTypes.func.isRequired,
  isUpdate: PropTypes.bool,
  children: PropTypes.node,
};

export default BasicInput;
