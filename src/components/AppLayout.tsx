import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar';

function AppLayout() {
  return (
    <div>
      <Header />
      <Sidebar />
      <Footer />
    </div>
  );
}

export default AppLayout;