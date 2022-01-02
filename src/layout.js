import {Paper} from '@mui/material';
import {styled} from '@mui/material/styles';

export const Title = styled(`h4`)(({theme}) => ({
  ...theme.typography.h4,
  borderBottom: `2px solid ${theme.palette.primary.main}`,
  margin: 0,
  padding: theme.spacing(1),
}));

export const ContentContainer = styled(`div`)(({theme}) => ({
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

