import React from 'react';
import ReactDOM from 'react-dom/client';

// Roboto font for Material-UI.
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import App from './features/app/App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App>
      <h1>Hello, world!</h1>
    </App>
  </React.StrictMode>
);
