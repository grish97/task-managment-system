import { useState } from 'react';
import { Button } from 'react-bootstrap';
import TaskActions from '../AddNewTask/TaskAction/TaskAction';
import './TasksTable.scss';

import { INewTask, ITask } from '@task';

interface IPropType {
  tasks: ITask[];
  deleteTask: (id: string) => any;
  updateTask: (id: string, data: Partial<ITask>) => any;
}

const columns: string[] = ['name', 'description', 'status', 'actions'];

function TasksTable(props: IPropType) {
  const [updatedTask, setUpdatedTask] = useState<ITask | null>(null);

  function updateStatus(task: ITask) {
    if (task.status === 'done') {
      return;
    }

    props.updateTask(task.id, {
      status: 'done',
    });
  }

  function toggleEditTask(task: ITask | null) {
    setUpdatedTask(task);
  }

  function updateTask(task: Partial<INewTask>): void {
    if (Object.keys(task).length) {
      props.updateTask(updatedTask?.id as string, task);
    }

    toggleEditTask(null);
  }

  return (
    <div className="tasks-table">
      <div className="tb-header">
        <div className="tb-row">
          {columns.map((key: string) => (
            <div className={`tb-th ${key}`} key={key}>
              {key}
            </div>
          ))}
        </div>
      </div>

      <div className="tb-body">
        {props.tasks.length ? (
          props.tasks.map((task: ITask) => (
            <div className="tb-row" key={task.id}>
              <div className={`tb-td name`}>{task.name}</div>
              <div className={`tb-td description`}>{task.description}</div>
              <div className={`tb-td status`}>{task.status.toUpperCase()}</div>
              <div className={`tb-td actions`}>
                <Button
                  variant="success"
                  className="done"
                  disabled={task.status === 'done'}
                  onClick={() => updateStatus(task)}
                >
                  Done
                </Button>
                <Button
                  variant="danger"
                  className="remove"
                  onClick={() => props.deleteTask(task.id)}
                >
                  Remove
                </Button>
                <Button variant="success" className="edit" onClick={() => toggleEditTask(task)}>
                  Edit
                </Button>
              </div>
            </div>
          ))
        ) : (
          <div className="no-data">You have not created any task</div>
        )}
      </div>

      {updatedTask !== null && (
        <TaskActions
          mode="edit"
          onClose={() => toggleEditTask(null)}
          onConfirm={updateTask}
          task={{
            name: updatedTask.name,
            description: updatedTask.description,
          }}
        />
      )}
    </div>
  );
}

export default TasksTable;
