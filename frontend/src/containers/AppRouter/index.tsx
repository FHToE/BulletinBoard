import React, { useEffect } from 'react';
import { Router } from 'react-router-dom';
import { history } from '@helpers/history.helper';
import Routing from '../Routing';
import { IAppState } from '@models/AppState';
import { connect } from 'react-redux';
import { fetchUserToLoginRoutine } from './routines';
import { IBindingAction } from '@models/Callbacks';
import { IUser } from './models/IUser';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '@screens/Authentication/constants';
import LoaderWrapper from '@components/LoaderWrapper';

interface IAppRouterProps {
  user: IUser;
  userLoading: boolean;
  isAuthorized: boolean;
  fetchUser: IBindingAction;
}

const AppRouter: React.FunctionComponent<IAppRouterProps> = ({
  user,
  isAuthorized,
  fetchUser,
  userLoading: loading
}) => {
  useEffect(() => {
    const unlisten = history.listen(() => {
      window.scrollTo(0, 0);
    });
    return () => {
      unlisten();
    };
  }, []);

  useEffect(() => {
    const isTokenExist = localStorage.getItem(ACCESS_TOKEN) || localStorage.getItem(REFRESH_TOKEN);
    if (isTokenExist && !user.id) {
      fetchUser();
    }
  }, [isAuthorized]);

  return (
    <LoaderWrapper loading={localStorage.getItem(ACCESS_TOKEN) ? loading : false}>
      <Router history={history}>
        <Routing isLoading={false} />
      </Router>
    </LoaderWrapper>
  );
};

const mapStateToProps = (state: IAppState) => {
  const { isAuthorized } = state.auth.auth;
  const { user, userLoading } = state.appRouter;
  return {
    user,
    isAuthorized,
    userLoading
  };
};

const mapDispatchToProps = {
  fetchUser: fetchUserToLoginRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(AppRouter);
