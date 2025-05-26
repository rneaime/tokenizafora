import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.js';

// Get the root element from the DOM
const rootElement = document.getElementById('root');

// Type guard to ensure rootElement is not null
if (!rootElement) {
  throw new Error('Failed to find the root element');
}

// Create a root using the new React 18 createRoot API
const root = createRoot(rootElement);

// Render the App component inside StrictMode
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);