import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button } from '@mui/material';
import { State } from '../../../store';
import { removeActiveStepUser } from '../../../store/slices/activeStepsSlice';

const ButtonFormUser: React.FC = () => {
  const dispatch = useDispatch();
  const activeStepUser = useSelector((state: State) => state.activeSteps.user);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 4 }}>
      <Button
        variant="contained"
        color="inherit"
        disabled={activeStepUser === 0}
        onClick={() => dispatch(removeActiveStepUser())}
      >
        Back
      </Button>
      <Box sx={{ flex: '1 1 auto' }} />
      <Button type="submit" variant="contained" color={activeStepUser === 2 ? 'secondary' : 'primary'}>
        {activeStepUser === 2 ? 'Finish' : 'Next'}
      </Button>
    </Box>
  );
};

export default ButtonFormUser;
