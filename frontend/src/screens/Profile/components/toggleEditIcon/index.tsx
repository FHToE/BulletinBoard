import React from 'react';
import styles from './styles.module.sass';
import { Icon, Label } from 'semantic-ui-react';

interface IToggleEditProps {
  isEditable: boolean;
  toggle: () => void;
}

const ToggleEdit: React.FC<IToggleEditProps> = ({
    isEditable = false, toggle
}) => {
  return (
    <Label as="a" onClick={()=>toggle()} size="medium" className={styles.toggle_icon} attached="top right">
      {isEditable? "Cancel " : "Edit "}
      <Icon 
        name={isEditable? "undo" : "pencil"}
      />
    </Label>
  );
};

export default ToggleEdit;
