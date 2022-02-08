import React, { Suspense } from 'react'
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom'
import routes from './router'

function App() {
  return (
    <HashRouter>
      <Suspense fallback={<h1>加载中...</h1>}>
        <Switch>
          {
            routes.map(({path, component, exact}) => (
              <Route path={path} component={component} exact={exact} key={component}></Route>
            ))
          }
          <Redirect to={'/'}></Redirect>
        </Switch>
      </Suspense>
    </HashRouter>
  );
}


export default App;