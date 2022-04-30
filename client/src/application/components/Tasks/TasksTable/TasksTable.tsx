import './TasksTable.scss';

import { ITask } from '@task';

interface IPropType {
  tasks: ITask[];
  deleteTask: (id: string) => any;
  updateTask: (id: string, data: Partial<ITask>) => any;
}

const columns: string[] = ['name', 'status', 'actions'];

function TasksTable(props: IPropType) {
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
          props.tasks.map((task: ITask, key: number) => (
            <div className="tb-row" key={key}>
              <div className={`tb-td name`}>{task.name}</div>
              <div className={`tb-td status`}>{task.status}</div>
              <div className={`tb-td actions`}>
                <button className="done" disabled={task.status === 'done'}>
                  Done
                </button>
                <button className="remove" onClick={() => props.deleteTask(task.id)}>
                  Remove
                </button>
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
