import { Button } from "flowbite-react";
import { HiOutlineClipboardList } from "react-icons/hi";
import { Link } from "react-router-dom";

export default function NoTasks() {
  return (
    <div className="flex flex-col items-center justify-center text-center p-6 bg-gray-800 rounded-2xl border border-gray-700 max-w-md mx-auto mt-12">
      <HiOutlineClipboardList className="text-gray-400 text-6xl mb-4" />
      <h2 className="text-xl font-semibold text-gray-400 mb-2">
        No tasks yet
      </h2>
      <p className="text-gray-300 mb-4">
        You don't have any tasks right now. Create one to get started!
      </p>
      <Button> <Link to="/new-task">Create task</Link></Button>
    </div>
  );
}
