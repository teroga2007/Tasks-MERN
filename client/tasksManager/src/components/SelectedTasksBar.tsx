import { Task } from "../models/Task";

const SelectedTasksBar = ({ selectedTasks, deleteSelectedTasks, completeSelectedTasks }: { selectedTasks: Task[]; deleteSelectedTasks: () => void, completeSelectedTasks: () => void }) => {
  return (
    <div className="flex justify-between items-center bg-gray-700 p-3 text-white rounded-md mb-2 gap-4">
      <span>{selectedTasks.length} task(s) selected</span>
      <div className="flex gap-2">
        <button
          onClick={completeSelectedTasks}
          className="bg-green-600 hover:bg-green-500 text-white px-4 py-1 rounded"
        >
          Mark as completed
        </button>
        <button
          onClick={deleteSelectedTasks}
          className="bg-red-600 hover:bg-red-500 text-white px-4 py-1 rounded"
        >
          Delete selected
        </button>
      </div>
    </div>
  )
}
export default SelectedTasksBar