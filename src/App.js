import { Spin } from 'antd'
import React, { Suspense, useReducer } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import { InfoMeContext } from './contexts/context/InfoMe'
import { infoMeReducer } from './contexts/reducers/infoMeReducer'
import { AppRouter } from './routers/approuter'

function App() {
  const [state, dispatch] = useReducer(infoMeReducer, {
    avatar: '',
    _idCustomer: null,
    _idRole: '',
    createBy: null,
    _id: '',
    username: '',
    email: '',
    createdAt: 0,
    __v: 0
  })
  const mapRoute = () => {
    return AppRouter.map((router, index) => {
      return <Route
        key={index}
        path={router.path}
        component={router.component}
        exact={router.exact}
      />
    })
  }
  return (
    <InfoMeContext.Provider
      value={{ data: state, dispatch: dispatch }}
    >
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
      </Router>
    </InfoMeContext.Provider>
  )
}
export default App;
