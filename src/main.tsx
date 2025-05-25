import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './components/App';
import Index from './pages/Index';
import Garantias from './pages/Garantias';
import IATerminalPage from './pages/IATerminalPage';
import NotFound from './pages/NotFound';
import UserList from './pages/UserList';
import Veiculos from './pages/Veiculos';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/garantias" element={<Garantias />} />
        <Route path="/ia-terminal" element={<IATerminalPage />} />
        <Route path="/user-list" element={<UserList />} />
        <Route path="/veiculos" element={<Veiculos />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
