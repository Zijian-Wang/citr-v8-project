// anything related to DOM cannot be inside Node.js
// Anything happens in browser, is written in this file.

import {hydrateRoot} from 'react-dom'
import {BrowserRouter} from 'react-router-dom'
import App from './App'

hydrateRoot(
  document.getElementById('root'),
  <BrowserRouter>
    <App />
  </BrowserRouter>
)