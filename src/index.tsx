import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {App} from './App';
import reportWebVitals from './reportWebVitals';
import {store} from '../src/store';
import { Provider } from 'react-redux';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const initializeApp = () => {
  const selectedDate = localStorage.getItem('selectedDate');
  if (selectedDate) {
    // 저장된 날짜가 있다면 Redux 상태에 반영
    store.dispatch({ type: 'SET_SELECTED_DATE', payload: selectedDate });
  }
};

root.render(
  <React.StrictMode>
    <Provider store={store}>
    <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
initializeApp();
