import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { routes } from 'routes/.tools/Utils/routes';
// import { PrivateRoute } from 'routes/PrivateRoute';

import { CoinData } from 'interfaces/view/CoinData';

export const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path={routes.COIN_DATA} component={CoinData} />
      </Switch>
    </Router>
  );
};
