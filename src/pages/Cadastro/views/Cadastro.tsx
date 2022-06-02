import React from 'react';
import { Box, Typography } from '@mui/material';
import StepperGeneric from '../../../shared/components/Stepper/components/StepperGeneric';

const Cadastro = () => {
  return (
    <Box boxShadow={2} my={10} p={6}>
      <StepperGeneric
        steps={[
          { name: 'Teste', isSkipped: true, component: <>AA</> },
          { name: 'Teste1', isSkipped: true, component: <>BB</> },
          { name: 'Teste2', isSkipped: false, component: <>CC</> },
        ]}
        sucess={<Typography sx={{ mt: 2, mb: 1 }}>Sucesso por props</Typography>}
      />
    </Box>
  );
};

export default Cadastro;
