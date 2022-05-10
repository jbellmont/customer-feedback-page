import React from 'react';
import ReactDOM from 'react-dom/client';
import {Typography} from '@mui/material';

// Roboto font for Material-UI.
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import App from './features/app/App';
import Form from './features/customer-review/components/Form';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App>
      <header>
        <Typography component="h1" sx={{fontWeight: 500}} variant="h3">
          Customer feedback page
        </Typography>
      </header>
      <Form />
    </App>
  </React.StrictMode>
);
