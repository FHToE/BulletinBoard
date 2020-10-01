import React, { FunctionComponent } from 'react';
import styles from './styles.module.sass';
import no_image from '@images/no_image.png';
import Ellipsis from 'react-ellipsis-pjs';

interface IBulletinCardProps {
  image: string;
  author: string;
  date: string;
  name: string;
  text: string;
}

const BulletinCard: FunctionComponent<IBulletinCardProps> = ({
  image, author, date, name, text
}) => {
  
  return (
    <div className={styles.main_container}>
      <div className={styles.meta__image}>
        <img src={image? image : no_image} alt="" className={styles.bulletin_avatar} />
      </div>
      <div className={styles.meta__content}>
        <div className={styles.meta__header}>
          <span className={styles.bulletin__name}>{name}</span>
        </div>
        <div className={styles.meta__info}>
          <span className={styles.bulletin__date}>{date}</span>
          <span className={styles.bulletin__author}>{`by ${author}`}</span>
        </div>
        <div className={styles.meta__body}>
          <div className={styles.bulletin__text}>
            <Ellipsis text={text} lines={5} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BulletinCard;
