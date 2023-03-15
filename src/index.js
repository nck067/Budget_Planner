import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import BudgetForm from './BudgetForm';
import BudgetTable from './BudgetTable';
import LoginPage from './login/LogIn';
import SignUpPage from './login/SignUp';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="form" element={<BudgetForm />} />
          <Route path="table" element={<BudgetTable />} />
          <Route path="signup" element={<SignUpPage />} />
          <Route path="/" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
