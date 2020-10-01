import { NavLink, useLocation } from 'react-router-dom';
import React from 'react';
import { history } from '@helpers/history.helper';
import { Icon, Label } from 'semantic-ui-react';
import styles from './styles.module.sass';
import { ACCESS_TOKEN, REFRESH_TOKEN } from 'screens/Authentication/constants';
import { connect } from 'react-redux';
import LogoWithText from '@components/LogoWithText';
import { setNoAuthorizedRoutine } from '@screens/Authentication/routines';
import { clearBulletinsStateRoutine } from '@screens/Bulletins/routines';
import { IBindingAction } from '@models/Callbacks';

interface IHeaderProps {
  setNoAuthorized: IBindingAction;
  clearBulletines: IBindingAction;
}

const Header = ({ setNoAuthorized, clearBulletines }: IHeaderProps) => {
  
  const location = useLocation();

  const handleOnClickSignOut = () => {
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(REFRESH_TOKEN);
    setNoAuthorized();
    clearBulletines();
    history.push('/');
  };

  return (
    <div className={styles.headerWrp}>
      <div className={styles.customHeader}>
        <div className={styles.left_side}>
          <div className={styles.logo_wrp}>
            <LogoWithText />
          </div>
        </div>
        <div className={styles.middle}>
          
        </div>
        <div className={styles.right_side}>
          <div className={styles.icons}>
            <div className={styles.column}>
              <NavLink exact to="profile">
                <Label
                  basic
                  size="tiny"
                  className={styles.routElement}
                >
                  <div className={styles.iconWrp}>
                    <Icon name="user" size="big" />
                  </div>
                  <div className={styles.routName}>Profile</div>
                </Label>
                {location.pathname === '/profile' && <div className={styles.homeLine} />}
              </NavLink>
            </div>
            <div className={styles.column}>
              <NavLink exact to="/bulletins">
                <Label
                  basic
                  size="tiny"
                  className={styles.routElement}
                >
                  <div className={styles.iconWrp}>
                    <Icon name="newspaper" size="big" />
                  </div>
                  <div className={styles.routName}>Bulletins</div>
                </Label>
                {location.pathname === '/bulletins' && <div className={styles.homeLine} />}
              </NavLink>
            </div>
          </div>
          <div className={styles.column}>
            <Label
              as="a"
              onClick={() => handleOnClickSignOut()}
              basic
              size="tiny"
              className={styles.routElement}
            >
              <div className={styles.iconWrp}>
                <Icon name="sign-out" size="big" />
              </div>
              <div className={styles.routName}>Sign out</div>
            </Label>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: any) => {
  const { appRouter, auth } = state;
  return {
    currentUser: appRouter.user,
    isAuthorized: auth.auth.isAuthorized
  };
};

const mapDispatchToProps = {
  setNoAuthorized: setNoAuthorizedRoutine,
  clearBulletines: clearBulletinsStateRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
