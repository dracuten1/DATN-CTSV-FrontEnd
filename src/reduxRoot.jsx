import * as React from 'react';
import { Provider } from 'react-redux';
import App from 'layout/app/App';
import store from './store';


function ReduxRoot() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}

export default ReduxRoot;
