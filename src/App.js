import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import AppLayout from './components/AppLayout';

const App = () => {
  return (
    <Provider store={store}>
      <div className="app">
        <AppLayout />
      </div>
    </Provider>
  );
};

export default App;

