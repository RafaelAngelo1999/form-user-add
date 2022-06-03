import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, Step, StepLabel, Stepper, Typography } from '@mui/material';
import StepperGeneric from '../../../shared/components/Stepper/components/StepperGeneric';
import UserInformation from '../components/UserInformation';
import { State } from '../../../store';

const Cadastro = () => {
  const activeStepUser = useSelector((state: State) => state.activeSteps.user);
  const steps = ['Select campaign settings', 'Create an ad group', 'Create an ad'];

  const log = () => console.log('');
  return (
    <Box boxShadow={2} my={10} p={6}>
      {/* <StepperGeneric
        steps={[
          { name: 'UserInformation', isSkipped: true, component: <UserInformation /> },
          { name: 'Teste1', isSkipped: true, component: <>BB</> },
          { name: 'Teste2', isSkipped: false, component: <>CC</> },
        ]}
        sucess={<Typography sx={{ mt: 2, mb: 1 }}>Sucesso por props</Typography>}
      /> */}
      {/* <UserInformation /> */}
      <Stepper activeStep={activeStepUser}>
        {steps.map((step, index) => {
          const stepProps: { completed?: boolean } = {};
          const labelProps: {
            optional?: React.ReactNode;
          } = {};
          return (
            <Step key={step} {...stepProps}>
              <StepLabel {...labelProps}>{step}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <UserInformation />
    </Box>
  );
};

export default Cadastro;
