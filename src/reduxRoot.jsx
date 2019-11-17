import * as React from 'react';
import { Provider } from 'react-redux';
import App from 'pages/app/App';
import store from './store';


function ReduxRoot() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}

export default ReduxRoot;
