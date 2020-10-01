import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react';
import React, { FunctionComponent, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { IBindingCallback1 } from '@models/Callbacks';
import LogoWithText from '../LogoWithText';
import styles from './styles.module.sass';
import { IRegisterRequest } from '@screens/Authentication/containers/RegisterPage';
import {
  isValidEmail,
  isValidPassword,
  isValidNameSurname
} from '@helpers/validation.helper';

interface IRegisterForm {
  register: IBindingCallback1<IRegisterRequest>;
  isRegisterLoading: boolean;
}

const RegisterForm: FunctionComponent<IRegisterForm> = ({
  register,
  isRegisterLoading
}) => {
  const [email, setEmail] = useState('');
  const [firstName, setFirstname] = useState('');
  const [lastName, setLastname] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isFNameValid, setIsFNameValid] = useState(true);
  const [isLNameValid, setIsLNameValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [isPasswordsMatch, setIsPasswordsMatch] = useState(true);

  const validateEmail = (newName?: string) => setIsEmailValid(
    isValidEmail(typeof newName === 'string' ? newName : email)
  );

  const validateFName = (newName?: string) => setIsFNameValid(
    isValidNameSurname(typeof newName === 'string' ? newName : firstName)
  );

  const validateLName = (newName?: string) => setIsLNameValid(
    isValidNameSurname(typeof newName === 'string' ? newName : lastName)
  );

  const validatePassword = (newName?: string) => {
    const lastChangeValue = typeof newName === 'string' ? newName : password;
    setIsPasswordValid(isValidPassword(lastChangeValue));
    setIsPasswordsMatch(lastChangeValue === repeatPassword);
  };
  const validateRepeatPassword = (newName?: string) => setIsPasswordsMatch(
    (typeof newName === 'string' ? newName : repeatPassword) === password
  );
  const isRequiredFieldsValid = (): boolean => isValidEmail(email) && isValidPassword(password)
    && isFNameValid && isLNameValid && password === repeatPassword;

  const handleLoginClick = e => {
    e.preventDefault();
    if (isRequiredFieldsValid) {
      register({ email, password, firstName, lastName });
    }
  };

  return (
    <div>
      <Grid textAlign="center" className={styles.main_container}>
        <Grid.Column className={styles.main_container__column}>
          <Header as="h2" textAlign="center" className={styles.main_container__header}>
            <LogoWithText />
          </Header>
          <Form
            name="loginForm"
            size="large"
            onSubmit={handleLoginClick}
            warning={!isEmailValid || !isPasswordValid || !isPasswordsMatch}
          >
            <Segment className={styles.main_container__form}>
              <Form.Input
                fluid
                icon="at"
                iconPosition="left"
                placeholder="Email"
                type="text"
                labelPosition="left"
                label="Email"
                required
                onChange={e => { setEmail(e.target.value); validateEmail(e.target.value); }}
                error={!isEmailValid}
                onBlur={validateEmail}
              />
              <Form.Input
                fluid
                icon="user"
                iconPosition="left"
                placeholder="FirstName"
                type="text"
                labelPosition="left"
                label="FirstName"
                required
                onChange={e => { setFirstname(e.target.value); validateFName(e.target.value); }}
                error={!isFNameValid}
                onBlur={validateFName}
              />
              <Form.Input
                fluid
                icon="user"
                iconPosition="left"
                placeholder="LastName"
                type="text"
                labelPosition="left"
                label="LastName"
                required
                onChange={e => { setLastname(e.target.value); validateLName(e.target.value); }}
                error={!isLNameValid}
                onBlur={validateLName}
              />
              <Form.Input
                fluid
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                type="password"
                labelPosition="left"
                label="Password"
                required
                onChange={e => { setPassword(e.target.value); validatePassword(e.target.value); }}
                error={!isPasswordValid}
                onBlur={validatePassword}
              />
              <Form.Input
                fluid
                icon="lock"
                iconPosition="left"
                placeholder="Repeat password"
                type="password"
                labelPosition="left"
                label="Repeat password"
                required
                onChange={e => { setRepeatPassword(e.target.value); validateRepeatPassword(e.target.value); }}
                error={!isPasswordsMatch}
                onBlur={validateRepeatPassword}
              />
              <div className={styles.main_container__submit_block}>
                <Button
                  color="teal"
                  className={styles.main_container__button_auth}
                  loading={isRegisterLoading}
                  disabled={!isRequiredFieldsValid()}
                >
                  SIGN UP
                </Button>
              </div>
            </Segment>
          </Form>
          <Message className={styles.main_container__signUp_message}>
            Have an account?
            {' '}
            <NavLink exact to="/">Sign in</NavLink>
          </Message>
        </Grid.Column>
      </Grid>
    </div>
  );
};

export default RegisterForm;
