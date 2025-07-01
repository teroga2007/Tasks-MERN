import { Task } from "../models/Task";

const SelectedTasksBar = ({ selectedTasks, deleteSelectedTasks }: { selectedTasks: Task[]; deleteSelectedTasks: () => void }) => {
  return (
    <div className="flex justify-between items-center bg-gray-700 p-3 text-white rounded-md mb-2">
      <span>{selectedTasks.length} task(s) selected</span>
      <button
        onClick={deleteSelectedTasks}
        className="bg-red-600 hover:bg-red-500 text-white px-4 py-1 rounded"
      >
        Delete selected
      </button>
    </div>
  )
}
export default SelectedTasksBar