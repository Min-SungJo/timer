import React from 'react';
import ReactDOMClient from 'react-dom/client';
import App from './App.tsx';
import reportWebVitals from './reportWebVitals';

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');
const root = ReactDOMClient.createRoot(rootElement);

root.render(<App />);

reportWebVitals();