import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import { Spin } from 'antd';
import { AppRouter } from './routers/approuter'
import './index.css';
import "animate.css/animate.min.css";
import 'antd/dist/antd.css';
import reportWebVitals from './reportWebVitals';

const mapRoute = () => {
  return AppRouter.map((router, index) => {
    return <Route key={index} path={router.path} component={router.component} />
  })
}

ReactDOM.render(
  <Router>
    <Suspense fallback={
      <div className="example">
        <Spin tip="Loading..." />
      </div>
    }>
      <Switch>
        {mapRoute()}
        <Redirect from='/' to='/landing-page' />
      </Switch>
    </Suspense>
  </Router>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
