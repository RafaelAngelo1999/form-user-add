import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { Box, Button } from '@mui/material';
import { State } from '../../../store';

const ButtonFormUser: React.FC = () => {
  const activeStepUser = useSelector((state: State) => state.activeSteps.user);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 4 }}>
      <Button
        variant="contained"
        color="inherit"
        disabled={activeStepUser === 0}
        onClick={() => console.log('')}
        sx={{ mr: 1 }}
      >
        Back
      </Button>
      <Box sx={{ flex: '1 1 auto' }} />
      <Button type="submit" variant="contained">
        {activeStepUser === 2 ? 'Finish' : 'Next'}
      </Button>
    </Box>
  );
};

export default ButtonFormUser;
