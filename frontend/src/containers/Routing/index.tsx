import React, { useState } from 'react';
import { Switch } from 'react-router-dom';
import PublicRoute from 'components/PublicRoute';
import Header from '@components/Header';
import BulletinsPage from '@screens/Bulletins/containers/BulletinsPage';
import RegisterPage from '@screens/Authentication/containers/RegisterPage';
import Profile from '@screens/Profile/containers/ProfilePage';
import PrivateRoute from '../PrivateRoute';
import RootRoute from '../RootRoute';
import { history } from '@helpers/history.helper';
import styles from './styles.module.sass';
import { InlineLoaderWrapper } from '@components/InlineLoaderWrapper';

export interface IRoutingProps {
  isLoading: boolean;
}

const Routing: React.FunctionComponent<IRoutingProps> = ({
  isLoading
}) => {
  const checkHeaderShown = () => {
    const headerBlackList = ['/', '/register' ];

    return headerBlackList.every(item => !(history.location.pathname === item) );
  };
  const [isHeaderShown, setIsHeaderShown] = useState(checkHeaderShown());

  history.listen(() => {
    setIsHeaderShown(checkHeaderShown());
  });

  if (isLoading) return <InlineLoaderWrapper loading centered />;

  return (
    <div className={styles.container}>
      {isHeaderShown && <Header />}
      <Switch>
        <RootRoute exact path="/" />
        <PublicRoute exact path="/register" component={RegisterPage} />
        <PrivateRoute exact path="/bulletins" component={BulletinsPage} />
        <PrivateRoute exact path="/profile" component={Profile} />
      </Switch>
    </div>
  );
};

export default Routing;
