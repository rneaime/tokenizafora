import React from 'react';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import Index from '../pages/Index';
import Garantias from '../pages/Garantias';
import Veiculos from '../pages/Veiculos';

function AppLayout() {
  return (
    <BrowserRouter>
      <div>
        <nav>
          <ul>
            <li><Link to='/' >Home</Link></li>
            <li><Link to='/garantias' >Garantias</Link></li>
            <li><Link to='/veiculos' >Veículos</Link></li>
          </ul>
        </nav>
        <Routes>
          <Route path='/' element={<Index />} />
          <Route path='/garantias' element={<Garantias />} />
          <Route path='/veiculos' element={<Veiculos />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default AppLayout;