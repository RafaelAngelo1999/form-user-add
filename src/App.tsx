import { Container } from '@mui/material';
import React from 'react';
import Router from './routes/components/Router';
import AppBarHeader from './shared/components/AppBarHeader';

const App = () => {
  return (
    <>
      <AppBarHeader />
      <Container>
        <Router />
      </Container>
    </>
  );
};

export default App;
