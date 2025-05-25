import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

console.log('Main.tsx carregado');

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);