import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import './plugin/analytics';

ReactDOM.render(
  <App />,
  document.getElementById('rhodonite') as HTMLElement
);
registerServiceWorker();
