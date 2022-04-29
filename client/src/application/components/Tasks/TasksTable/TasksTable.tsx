import './TasksTable.scss';

interface IPropType {
  tasks: any[];
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
        {Array(10)
          .fill(null)
          .map((task: any, key: number) => (
            <div className="tb-row" key={key}>
              <div className={`tb-td name`}>Column Name</div>
              <div className={`tb-td status`}>TODO</div>
              <div className={`tb-td actions`}>
                <button className="done">Done</button>
                <button className="remove">Remove</button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default TasksTable;
