import React, { Suspense } from 'react'
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom'
import routes from './router'
import { Provider } from 'react-redux';
import store from "./store/index"

function App() {
  return (
    <Provider store={store}>
      <HashRouter>
        <Suspense fallback={<h1>加载中...</h1>}>
          <Switch>
            {
              routes.map(({ path, component, exact }) => (
                <Route path={path} component={component} exact={exact} key={component}></Route>
              ))
            }
            <Redirect to={'/'}></Redirect>
          </Switch>
        </Suspense>
      </HashRouter>
    </Provider>

  );
}


export default App;