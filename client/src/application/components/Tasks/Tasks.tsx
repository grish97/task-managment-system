import AddNewTask from './AddNewTask/AddNewTask';
import TasksTable from './TasksTable/TasksTable';
import './Tasks.scss';
import { useState } from 'react';
import { ITask } from '@task';

interface IStateType {
  tasks: ITask[];
}

function Tasks() {
  const [tasks, setTasks] = useState<IStateType['tasks']>([]);

  function onAdd(name: string) {}

  return (
    <div className="tasks-content">
      <AddNewTask />

      <TasksTable tasks={[]} />
    </div>
  );
}

export default Tasks;
