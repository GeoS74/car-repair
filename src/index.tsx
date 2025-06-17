import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from "react-redux";
import store from './store/index'

import router from './routes/app.router';
import './index.css';
import './styles.module.css';

ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)
  .render(
    <React.Fragment>
      <Provider store={store}>
        {router}
      </Provider>
    </React.Fragment>
  );