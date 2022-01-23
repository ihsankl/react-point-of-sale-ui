import {AttachMoney} from '@mui/icons-material';
import {
  Avatar,
  Card,
  CardContent,
  Box,
  Typography,
} from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';
import {rupiahFormatter} from '../../../helper';

const TotalProfit = ({profit, ...props}) => {
  return <Card
    elevation={3}
    sx={{flex: 1}}
    {...props}
  >
    <CardContent>
      <Box
        sx={{display: 'flex', justifyContent: 'space-between'}}
      >
        <Box sx={{display: 'flex', flexDirection: 'column', gap: '1em'}}>
          <Typography
            color="textSecondary"
            gutterBottom
            variant="overline"
          >
            TOTAL PROFIT
          </Typography>
          <Typography
            color="textPrimary"
            variant="h4"
            sx={{
              overflow: 'hidden',
              maxWidth: '250px',
            }}
          >
            {rupiahFormatter(profit)}
          </Typography>
        </Box>
        <Box>
          <Avatar
            sx={{
              backgroundColor: 'secondary.main',
              height: 56,
              width: 56,
            }}
          >
            <AttachMoney />
          </Avatar>
        </Box>
      </Box>
    </CardContent>
  </Card>;
};

TotalProfit.propTypes = {
  profit: PropTypes.number.isRequired,
};

export default React.memo(TotalProfit);
