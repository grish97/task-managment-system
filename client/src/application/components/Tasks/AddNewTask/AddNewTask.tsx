import { ChangeEvent, useEffect, useState } from 'react';
import { FormControl, FloatingLabel, Button } from 'react-bootstrap';
import { Modal } from 'application/common';
import { validator } from 'services';
import './AddNewTask.scss';

import { INewTask } from '@task';

interface IPropType {
  onAddNew: (task: INewTask) => void;
}

function AddNewTask(props: IPropType) {
  const [isAddNew, setIsAddNew] = useState(false);
  const [taskName, setTaskName] = useState('');
  const [description, setDescription] = useState('');
  const [taskError, setTaskError] = useState('');
  const [descriptionError, setDescriptionError] = useState('');

  function createTask(): void {
    if (!isValidForm()) {
      return;
    }

    resetState();

    props.onAddNew({
      name: taskName,
      description: description,
    });
  }

  function isValidForm(): boolean {
    return validator.validate(taskName, 3).isValid && validator.validate(description, 3).isValid;
  }

  function toggleCrationPopup(): void {
    const nextValue = !isAddNew;
    setIsAddNew(nextValue);
  }

  function onChangeTaskName(event: ChangeEvent<HTMLInputElement>): void {
    const value = event.target.value;
    const { message } = validator.validate(value, 3);

    setTaskName(value);
    setTaskError(message);
  }

  function onChangeDescription(event: ChangeEvent<HTMLTextAreaElement>): void {
    const value = event.target.value;
    const { message } = validator.validate(value, 3);

    setDescription(value);
    setDescriptionError(message);
  }

  function resetState(): void {
    setIsAddNew(false);
    setTaskName('');
    setDescription('');
    setTaskError('');
    setDescriptionError('');
  }

  return (
    <div className="add-new-task">
      <div className="add-button">
        <button onClick={toggleCrationPopup}>+ Add New</button>
      </div>

      {isAddNew && (
        <Modal onClose={toggleCrationPopup} title="Add New Task" className="new-task-popup">
          <FloatingLabel label="Task Name" className="mb-3">
            <FormControl
              as="input"
              placeholder="Leave a comment here"
              onChange={onChangeTaskName}
              value={taskName}
              isInvalid={Boolean(taskError.length)}
            />
            <FormControl.Feedback type={taskError ? 'invalid' : 'valid'}>
              {taskError}
            </FormControl.Feedback>
          </FloatingLabel>
          <FloatingLabel label="Description">
            <FormControl
              as="textarea"
              placeholder="Task Description here"
              style={{ height: '100px' }}
              onChange={onChangeDescription}
              value={description}
              isInvalid={Boolean(descriptionError.length)}
            />

            <FormControl.Feedback type={descriptionError ? 'invalid' : 'valid'}>
              {descriptionError}
            </FormControl.Feedback>
          </FloatingLabel>

          <div className="buttons-group">
            <Button variant="secondary" onClick={toggleCrationPopup}>
              Cancel
            </Button>
            <Button variant="success" onClick={createTask}>
              Create
            </Button>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default AddNewTask;
