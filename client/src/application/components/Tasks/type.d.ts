declare module '@task' {
  interface ITask {
    id: string;
    name: string;
    status: string;
    description: string;
    createdAt: string;
  }

  interface INewTask {
    name: string;
    description: string;
  }
}
