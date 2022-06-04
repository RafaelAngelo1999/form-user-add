import React from 'react';
import { useSelector } from 'react-redux';
import { Box, Step, StepLabel, Stepper } from '@mui/material';
import UserInformation from '../components/UserInformation';
import { State } from '../../../store';
import UserAddress from '../components/UserAddress';

const Cadastro = () => {
  const activeStepUser = useSelector((state: State) => state.activeSteps.user);
  const steps = ['Select campaign settings', 'Create an ad group', 'Create an ad'];

  return (
    <Box boxShadow={2} my={10} p={6}>
      <Stepper activeStep={activeStepUser}>
        {steps.map((step) => {
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
      <UserAddress />
    </Box>
  );
};

export default Cadastro;
