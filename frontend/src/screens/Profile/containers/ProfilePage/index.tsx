import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
  fetchUserInfoRoutine,
  saveUserInfoRoutine,
  addBulletinRoutine
} from 'screens/Profile/routines';
import { IBindingAction, IBindingCallback1 } from 'models/Callbacks';
import { Button, Form, Segment } from 'semantic-ui-react';
import styles from './styles.module.sass';
import { IAppState } from 'models/AppState';
import { IUser } from '../../models/IUser';
import ToggleEdit from '../../components/toggleEditIcon';
import AddBulletinModal from '../AddBulletinModal';
import { IBulletin } from '../../models/IBulletin';
import {
  isValidEmail,
  isValidPassword,
  isValidNameSurname
} from '@helpers/validation.helper';

export interface IProfileProps {
  oldEmail: string;
  oldFName: string;
  oldLName: string;
  oldPassword: string;
  fetchUser: IBindingAction;
  saveUser: IBindingCallback1<IUser>;
  addBulletin: IBindingCallback1<IBulletin>;
  loading: boolean
}

const Profile: React.FunctionComponent<IProfileProps> = ({
  oldEmail, oldFName, oldLName, oldPassword, fetchUser, saveUser, addBulletin, loading
}) => {
  const [modalAddOpen, setModalAddOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [firstName, setFirstname] = useState('');
  const [lastName, setLastname] = useState('');
  const [password, setPassword] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isFNameValid, setIsFNameValid] = useState(true);
  const [isLNameValid, setIsLNameValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [isEditable, setIsEditable] = useState(false);

  useEffect(() => {
      fetchUser();
      setEmail(oldEmail);
      setFirstname(oldFName);
      setLastname(oldLName);
      setPassword(oldPassword);
  }, [oldEmail, oldFName, oldLName]);

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
  };

  const handleSave = () => {
    saveUser({firstName, lastName, email, password});
    setIsEditable(false);
  }

  const toggleEditable = () => {
    if (isEditable) {
      setIsEditable(false);
      setEmail(oldEmail);
      setFirstname(oldFName);
      setLastname(oldLName);
      setPassword(oldPassword);
      setIsPasswordValid(true);
      setIsEmailValid(true);
      setIsFNameValid(true);
      setIsLNameValid(true);
    } else {
      setIsEditable(true);
    }
  }

  const isSaveable = isEmailValid && isFNameValid && isLNameValid && isPasswordValid && password.length !== 0
    && !(email === oldEmail && firstName === oldFName && lastName === oldLName && password === oldPassword);


  return (
    <div className={styles.main_container}>
      <div className={styles.wide_container}>
        <div className={styles.main_content}>
          <Button className={styles.add_button} onClick={() => setModalAddOpen(true)}>
            Add new bulletin
          </Button>
          <div className={styles.form_container}>
            <Form
              className={styles.userform}
              name="loginForm"
              size="large"
              onSubmit={handleSave}
              warning={!isEmailValid || !isPasswordValid || isFNameValid || isLNameValid }
            >
              <Segment className={styles.form_segment}>
                <ToggleEdit isEditable={isEditable} toggle={toggleEditable} />
                <Form.Input
                  fluid
                  value={email}
                  icon="at"
                  disabled={!isEditable}
                  iconPosition="left"
                  placeholder="Email"
                  type="text"
                  labelPosition="left"
                  label="Email"
                  onChange={e => { setEmail(e.target.value); validateEmail(e.target.value); }}
                  error={!isEmailValid}
                  onBlur={validateEmail}
                />
                <Form.Input
                  fluid
                  value={firstName}
                  icon="user"
                  disabled={!isEditable}
                  iconPosition="left"
                  placeholder="FirstName"
                  type="text"
                  labelPosition="left"
                  label="FirstName"
                  onChange={e => { setFirstname(e.target.value); validateFName(e.target.value); }}
                  error={!isFNameValid}
                  onBlur={validateFName}
                />
                <Form.Input
                  fluid
                  value={lastName}
                  icon="user"
                  disabled={!isEditable}
                  iconPosition="left"
                  placeholder="LastName"
                  type="text"
                  labelPosition="left"
                  label="LastName"
                  onChange={e => { setLastname(e.target.value); validateLName(e.target.value); }}
                  error={!isLNameValid}
                  onBlur={validateLName}
                />
                <Form.Input
                  fluid
                  value={password}
                  icon="lock"
                  disabled={!isEditable}
                  iconPosition="left"
                  placeholder="Password"
                  type="password"
                  labelPosition="left"
                  onClick={() => setPassword("")}
                  label="Password"
                  onChange={e => { setPassword(e.target.value); validatePassword(e.target.value); }}
                  error={!isPasswordValid}
                  onBlur={validatePassword}
                />
                <div className={styles.main_container__submit_block}>
                  <Button
                    className={styles.save_button}
                    loading={loading}
                    disabled={!isSaveable}
                    fluid
                  >
                    SAVE
                  </Button>
                </div>
              </Segment>
            </Form>
          </div>
        </div>
      </div>
      <AddBulletinModal save={addBulletin} openAction={setModalAddOpen} isOpen={modalAddOpen}/>
    </div>
  );
};

const mapStateToProps = (state: IAppState) => {
  const { profile } = state;
  return {
    oldEmail: profile.data.email,
    oldFName: profile.data.firstName,
    oldLName: profile.data.lastName,
    oldPassword: profile.data.password,
    loading: profile.requests.saveUserRequest.loading
  };
};

const mapDispatchToProps = {
  fetchUser: fetchUserInfoRoutine,
  saveUser: saveUserInfoRoutine,
  addBulletin: addBulletinRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
