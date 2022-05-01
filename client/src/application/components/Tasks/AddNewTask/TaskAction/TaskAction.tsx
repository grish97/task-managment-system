import { useState, useEffect, ChangeEvent } from 'react';
import { FloatingLabel, FormControl, Button } from 'react-bootstrap';
import { validator } from 'services';
import { Modal } from 'application/common';

import { INewTask } from '@task';

interface IPropType {
  onClose: () => any;
  onConfirm: (task: Partial<INewTask>) => any;
  mode: 'edit' | 'create';
  task?: INewTask;
}

function TaskAction(props: IPropType) {
  const [name, setTaskName] = useState('');
  const [description, setDescription] = useState('');
  const [taskError, setTaskError] = useState('');
  const [descriptionError, setDescriptionError] = useState('');
  const [updatedFields, setUpdatedFields] = useState<string[]>([]);

  const textDetail = actionDetail();

  useEffect(() => {
    if (props.mode === 'edit') {
      setExistValues();
    }
  }, []);

  /**
   * This function used when action mode is edit
   */
  function setExistValues(): void {
    if (props.task) {
      setTaskName(props.task.name || '');
      setDescription(props.task.description || '');
    }
  }

  /**
   * Confirm action
   * call onfim method and send result
   */
  function onConfirm() {
    if (!isValidForm()) {
      return;
    }

    const fields: INewTask = {
      name: name,
      description: description,
    };
    let resultFields: Partial<INewTask> = {};

    if (props.mode === 'edit') {
      Object.keys(fields).forEach((key) => {
        if (updatedFields.includes(key)) {
          const fieldKey = key as keyof INewTask;
          resultFields[fieldKey] = fields[fieldKey];
        }
      });
    } else {
      resultFields = { ...fields };
    }

    props.onConfirm(resultFields);

    resetState();
  }

  function onCancel(): void {
    resetState();
    props.onClose();
  }

  /**
   * Check for is valid
   * @returns {boolean}
   */
  function isValidForm(): boolean {
    return validator.validate(name, 3).isValid && validator.validate(description, 3).isValid;
  }

  function onChangeTaskName(event: ChangeEvent<HTMLInputElement>): void {
    const value = event.target.value;
    const { message } = validator.validate(value, 3);

    if (props.mode === 'edit') {
      addInUpdatedList('name');
    }

    setTaskName(value);
    setTaskError(message);
  }

  function onChangeDescription(event: ChangeEvent<HTMLTextAreaElement>): void {
    const value = event.target.value;
    const { message } = validator.validate(value, 3);

    if (props.mode === 'edit') {
      addInUpdatedList('description');
    }

    setDescription(value);
    setDescriptionError(message);
  }

  function addInUpdatedList(fieldKey: string): void {
    if (!updatedFields.includes(fieldKey)) {
      updatedFields.push(fieldKey);
      setUpdatedFields(updatedFields);
    }
  }

  function resetState(): void {
    setTaskName('');
    setDescription('');
    setTaskError('');
    setDescriptionError('');
  }

  /**
   * Modal text changes depending on mode
   * @returns {any}
   */
  function actionDetail(): any {
    const details: any = {
      title: 'Add New Task',
      saveButton: 'Create',
    };

    if (props.mode === 'edit') {
      details.title = 'Edit Task';
      details.saveButton = 'Update';
    }

    return details;
  }

  return (
    <Modal onClose={props.onClose} title={textDetail.title} className="new-task-popup">
      <FloatingLabel label="Enter Task Name" className="mb-3">
        <FormControl
          as="input"
          placeholder="Task Name here"
          onChange={onChangeTaskName}
          value={name}
          isInvalid={Boolean(taskError.length)}
        />
        <FormControl.Feedback type={taskError ? 'invalid' : 'valid'}>
          {taskError}
        </FormControl.Feedback>
      </FloatingLabel>
      <FloatingLabel label="Enter Description">
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
        <Button variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button variant="success" onClick={onConfirm}>
          {textDetail.saveButton}
        </Button>
      </div>
    </Modal>
  );
}

export default TaskAction;
