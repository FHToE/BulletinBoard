import React from 'react';
import { IAppState } from '@models/AppState';
import { connect } from 'react-redux';
import PublicRoute from '@components/PublicRoute';
import { Redirect } from 'react-router-dom';
import LoginPage from '@screens/Authentication/containers/LoginPage';

interface IRootRouteProps {
  isAuthorized: boolean;
  exact: boolean;
  path: string;
}

const RootRoute: React.FunctionComponent<IRootRouteProps> = props => {
  const { isAuthorized } = props;
  let currentComponent: React.FunctionComponent = null;
  
  if (!isAuthorized) {
    currentComponent = LoginPage;
  } else  {
    currentComponent = () => <Redirect to="/bulletins" />;
  }
  
  return (
    <PublicRoute {...props} component={currentComponent} />
  );
};

const mapStateToProps = (state: IAppState) => {
  const { isAuthorized } = state.auth.auth;
  return {
    isAuthorized
  };
};

export default connect(mapStateToProps)(RootRoute);
