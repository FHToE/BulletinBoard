import React, { useState } from 'react';
import styles from './styles.module.sass';
import { Header, Input, Button, Modal, ModalContent } from 'semantic-ui-react';
import { IBindingCallback1 } from 'models/Callbacks';
import { isImage } from 'screens/Profile/services/helper.service';
import { IBulletin } from '../../models/IBulletin';
import image from '@images/no_image.png';
import {
  isValidBulletinName,
  isValidBulletinBody
} from '@helpers/validation.helper';

interface IAddBulletinModalProps {
  isOpen: boolean;
  openAction: (isOpen: boolean) => void;
  save: IBindingCallback1<IBulletin>;
}

export const AddBulletinModal: React.FC<IAddBulletinModalProps> = ({
  isOpen = false, openAction, save
}) => {
  const [text, setText] = useState('');
  const [name, setName] = useState('');
  const [uploadImage, setUploadImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(undefined);
  const [isValidName, setIsValidName] = useState(true);
  const [isValidText, setIsValidText] = useState(true);
  
  const handleUploadFile = file => {
    const thisFile: File = file;
    if (thisFile && isImage(thisFile.name)) {
      setUploadImage(thisFile);
      setPreviewImage(URL.createObjectURL(thisFile));
    };
  };

  const isReadyToAdd = text && name && isValidName && isValidText;

  const validateName = (newName?: string) => {
    const lastChangesName = typeof newName === 'string' ? newName : name;
    setIsValidName(!!lastChangesName && isValidBulletinName(lastChangesName));
  };

  const validateText = (newText?: string) => {
    const lastChangesName = typeof newText === 'string' ? newText : text;
    setIsValidText(!!lastChangesName && isValidBulletinBody(lastChangesName));
  };

  const handleAdd = () => {
    save({name, text, image: uploadImage});
    handleClose();
  }


  const handleClose = () => {
    setName('');
    setText('');
    openAction(false);
    setUploadImage(null);
    setPreviewImage(undefined);
  };

  return (
    <Modal closeIcon size="small" open={isOpen} onClose={() => handleClose()}>
      <ModalContent className={styles.modal__upload__content}>
        <div className={styles.top_row}>
          <div className={styles.left_column}>
            <Header size="large">New Bulletin</Header>
            <div className={styles.textcontainer}>Name:</div>
            <Input
              fluid
              type="text"
              error={!isValidName}
              value={name}
              className={styles.customInput}
              onChange={e => {
                const lastChangeValue = e.currentTarget.value;
                setName(lastChangeValue);
                validateName(lastChangeValue);
              }}
              onBlur={() => validateName()}
              inverted
            />
            <div className={styles.textcontainer}>Description:</div>
          </div>
          <div className={styles.right_column}>
            <div className={styles.uploadWrapper}>
              <img src={previewImage? previewImage : image} alt="" className={styles.avatar} />
              <Button as="label" className={styles.uploader}>
                upload...
                <input name="image" type="file" onChange={e => handleUploadFile(e.target.files[0])} hidden />
              </Button>
            </div>
          </div>
        </div>
        <div className={styles.textareacontainer}>
          <textarea
            onChange={ev => {
              const { value } = ev.target;
              setText(value);
              validateText(value);
            }}
            className={isValidText ? styles.customtextarea : styles.customtextarea_error}
            value={text}
            onBlur={() => validateText()}
          />
        </div>
        <Button disabled={!isReadyToAdd} className={styles.add_button} onClick={() => handleAdd()}>
          Add!
        </Button>
      </ModalContent>
    </Modal>
  );
};

export default AddBulletinModal;
