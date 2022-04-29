import './AddNewTask.scss';

interface IPropType {}

function AddNewTask(props: IPropType) {
  return (
    <div className="add-new-task">
      <div className="input-area">
        <input type="text" placeholder="Enter Task" />
      </div>

      <div className="add-button">
        <button>+ Add New</button>
      </div>
    </div>
  );
}

export default AddNewTask;
