import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Cadastro } from '../../pages/Cadastro';

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Cadastro />} />
    </Routes>
  );
};

export default Router;
