import React from 'react';
import styles from './styles.module.sass';
import { Image } from 'semantic-ui-react';
import image from '@images/logo.png';

const Logo = () => (
  <div className={styles.container}>
    <Image src={image} />
  </div>
);

export default Logo;
