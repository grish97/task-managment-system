import { useEffect, useState } from 'react';
import AddNewTask from './AddNewTask/AddNewTask';
import TasksTable from './TasksTable/TasksTable';
import TaskService from './TaskService';
import './Tasks.scss';

import { INewTask, ITask } from '@task';
import { toast } from 'react-toastify';

interface IStateType {
  tasks: ITask[];
}

function Tasks() {
  const [tasks, setTasks] = useState<IStateType['tasks']>([]);

  useEffect(() => {
    loadTasks();
  }, []);

  /**
   * Load all task, modify and save on the state
   */
  async function loadTasks(): Promise<void> {
    const result = await TaskService.getAll();

    if (result.success && Array.isArray(result.data)) {
      const taskList: ITask[] = [];

      for (const task of result.data) {
        taskList.push({
          id: task._id,
          name: task.name,
          description: task.description,
          status: task.status,
          createdAt: task.createdAt,
        });
      }

      setTasks(taskList);
    } else {
      showProblem(result.message);
    }
  }

  /**
   * Add new task
   * @param {INewTask} task
   */
  async function createTask(task: INewTask): Promise<void> {
    const result = await TaskService.create(task);

    if (result.success) {
      loadTasks();
    } else {
      showProblem(result.message);
    }
  }

  /**
   * Update task by id
   * @param {string} id
   * @param {Partial<INewTask>} data
   */
  async function updateTask(id: string, data: Partial<INewTask>): Promise<void> {
    const response = await TaskService.update(id, data);

    if (response.success) {
      loadTasks();
    } else {
      showProblem(response.message);
    }
  }

  /**
   * Delete task by id
   * @param {string} id
   */
  async function deleteTask(id: string): Promise<void> {
    const response = await TaskService.delete(id);

    if (response.success) {
      loadTasks();
    } else {
      showProblem(response.message);
    }
  }

  /**
   * Show problem related request
   * @param {string} message
   */
  function showProblem(message: string): void {
    let error = 'Please try again\n';

    if (message.length) {
      error += message;
    }

    toast.error(error);
  }

  return (
    <div className="tasks-content">
      <AddNewTask onAddNew={createTask} />

      <TasksTable tasks={tasks} deleteTask={deleteTask} updateTask={updateTask} />
    </div>
  );
}

export default Tasks;
