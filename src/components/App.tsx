import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Tokenizer from './Tokenizer';
import Index from '../pages/Index';

function App() {
  return (
    <div>
      <Header />
      <Index />
      <Tokenizer />
      <Footer />
    </div>
  );
}

export default App;