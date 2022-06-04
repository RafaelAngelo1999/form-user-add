import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Button, Typography } from '@mui/material';
import { State } from '../../../store';
import { removeActiveStepUser } from '../../../store/slices/activeStepsSlice';
import SuccessImg from '../../../shared/imgs/success.png';

const FinishFormUser: React.FC = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: State) => state.user);

  return (
    <Grid container direction="column" justifyContent="center" alignItems="center">
      <img src={SuccessImg} width="400px" alt="" />
      <Typography variant="h2" color="#4BB543">
        Success
      </Typography>
      <Button variant="contained" color="secondary" onClick={() => window.location.reload()}>
        Back Home
      </Button>
      <Grid container direction="row" justifyContent="center" mt={3}>
        <Typography variant="body1" sx={{ wordWrap: 'break-word', whiteSpace: 'pre-wrap' }}>
          {JSON.stringify(user.information, null, '\t')}
        </Typography>
        <Typography variant="body1" sx={{ wordWrap: 'break-word', whiteSpace: 'pre-wrap' }}>
          {JSON.stringify(user.address, null, '\t')}
        </Typography>
        <Typography variant="body1" sx={{ wordWrap: 'break-word', whiteSpace: 'pre-wrap' }}>
          {JSON.stringify(user.contact, null, '\t')}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default FinishFormUser;
