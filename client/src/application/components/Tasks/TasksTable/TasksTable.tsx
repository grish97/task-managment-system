import { Button } from 'react-bootstrap';
import './TasksTable.scss';

import { ITask } from '@task';

interface IPropType {
  tasks: ITask[];
  deleteTask: (id: string) => any;
  updateTask: (id: string, data: Partial<ITask>) => any;
}

const columns: string[] = ['name', 'status', 'actions'];

function TasksTable(props: IPropType) {
  function updateStatus(task: ITask) {
    if (task.status === 'done') {
      return;
    }

    props.updateTask(task.id, {
      status: 'done',
    });
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
              </div>
            </div>
          ))
        ) : (
          <div className="no-data">You have not created any task</div>
        )}
      </div>
    </div>
  );
}

export default TasksTable;
