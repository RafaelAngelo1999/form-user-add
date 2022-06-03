import React from 'react';
import { Provider } from 'react-redux';
import { Container } from '@mui/material';
import Router from './routes/components/Router';
import AppBarHeader from './shared/components/AppBarHeader';
import { store } from './store';

const App = () => {
  return (
    <Provider store={store}>
      <AppBarHeader />
      <Container>
        <Router />
      </Container>
    </Provider>
  );
};

export default App;
