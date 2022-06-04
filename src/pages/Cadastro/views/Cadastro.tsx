import React from 'react';
import { useSelector } from 'react-redux';
import { Box, Step, StepLabel, Stepper } from '@mui/material';
import UserInformation from '../components/UserInformation';
import { State } from '../../../store';
import UserAddress from '../components/UserAddress';
import UserContact from '../components/UserContact';
import FinishFormUser from '../components/FinishFormUser';

const Cadastro = () => {
  const activeStepUser = useSelector((state: State) => state.activeSteps.user);
  const steps = ['Information', 'Address', 'Contact'];

  return (
    <>
      {activeStepUser === 0 || activeStepUser < 3 ? (
        <Box boxShadow={2} my={10} p={6}>
          <Stepper activeStep={activeStepUser} style={{ marginBottom: '36px' }}>
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
          {activeStepUser === 0 && <UserInformation />}
          {activeStepUser === 1 && <UserAddress />}
          {activeStepUser === 2 && <UserContact />}
        </Box>
      ) : (
        <FinishFormUser />
      )}
    </>
  );
};

export default Cadastro;
