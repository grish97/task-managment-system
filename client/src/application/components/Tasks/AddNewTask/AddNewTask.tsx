import { ChangeEvent, useEffect, useState } from 'react';
import { FormControl, FloatingLabel, Button } from 'react-bootstrap';
import { Modal } from 'application/common';
import { validator } from 'services';
import TaskActions from './TaskAction/TaskAction';
import './AddNewTask.scss';

import { INewTask } from '@task';

interface IPropType {
  onAddNew: (task: INewTask) => void;
}

function AddNewTask(props: IPropType) {
  const [isAddNew, setIsAddNew] = useState(false);

  function createTask(task: INewTask): void {
    props.onAddNew(task);
    toggleCrationPopup();
  }

  function toggleCrationPopup(): void {
    const nextValue = !isAddNew;
    setIsAddNew(nextValue);
  }

  return (
    <div className="add-new-task">
      <div className="add-button">
        <button onClick={toggleCrationPopup}>+ Add New</button>
      </div>

      {isAddNew && (
        <TaskActions
          mode="create"
          onClose={toggleCrationPopup}
          onConfirm={(task) => createTask(task as INewTask)}
        />
      )}
    </div>
  );
}

export default AddNewTask;
