import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';

import isNil from 'lodas/isNil';

import { routes } from 'routes/.tools/Utils/routes';

import { UserContext } from 'ui/views/_functions/Contexts/UserContext';
import { userStorage } from 'core/domain/model/User/UserStorage';

export const PrivateRoute = ({ component: Component, path }) => {
  const user = useContext(UserContext);

  return (
    <Route
      path={path}
      render={props =>
        userStorage.hasToken() || !isNil(user.id) ? (
          <Component />
        ) : (
          <Redirect to={{ pathname: routes.LOGIN, state: { from: props.location } }} />
        )
      }
    />
  );
};
