import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "./index.scss"
import { FavesContextProvider } from './context/FavesContext';
import { AuthContextProvider } from './context/authContext/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <FavesContextProvider>
        <App />
      </FavesContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
