import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import GlobalStyles from './styles/global';
import Routes from './routes';

const App: React.FC = () => {
  return (
    <>
      <GlobalStyles />
      <ToastContainer autoClose={3000} />
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </>
  );
};

export default App;
