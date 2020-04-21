import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { routes } from 'routes/.tools/Utils/routes';
// import { PrivateRoute } from 'routes/PrivateRoute';

import { CoinData } from 'interfaces/views/CoinData';
import { DataTableDemo } from 'interfaces/views/Coin/DataTableDemo';

import { LanguageProvider } from 'interfaces/views/.tools/Providers/LanguageProvider';
import { MessagesProvider } from 'interfaces/views/.tools/Providers/MessagesProvider';

export const App = () => {
  return (
    <MessagesProvider>
      <LanguageProvider>
        <Router>
          <Switch>
            <Route exact path={routes.COIN_DATA} component={CoinData} />
            <Route exact path={routes.COIN} component={DataTableDemo} />
          </Switch>
        </Router>
      </LanguageProvider>
    </MessagesProvider>
  );
};
