import {FormControl, Paper} from '@mui/material';
import {styled} from '@mui/material/styles';

export const Title = styled(`h4`)(({theme}) => ({
  ...theme.typography.h4,
  borderBottom: `2px solid ${theme.palette.primary.main}`,
  margin: 0,
  padding: theme.spacing(1),
}));

export const SubHeader = styled(`div`)(({theme}) => ({
  ...theme.typography.body1,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '1em 0 1em 0',
}));

export const PaperContainer = styled(Paper)(({theme}) => ({
  ...theme.typography.body1,
  padding: theme.spacing(1),
  marginTop: '5em',
  marginLeft: '.5em',
  marginRight: '.5em',
  display: 'flex',
  flex: 1,
  paddingLeft: '1em',
  paddingRight: '1em',
  flexDirection: 'column',
  height: '100%',
}));

export const FormContainer = styled('form')(({theme}) => ({
  ...theme.typography.body1,
  gap: '1em',
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
}));

export const FormControlContainer = styled(FormControl)(({theme}) => ({
  ...theme.typography.body1,
  width: '50%',
  display: 'flex',
  flexDirection: 'column',
  gap: '.5em',
}));
