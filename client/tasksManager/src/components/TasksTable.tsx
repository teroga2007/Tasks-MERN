
import axios from "axios";
import { Checkbox, Spinner, Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import moment from "moment";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";

import type { Task } from "../models/Task";
import NoTasks from "./NoTasks";
import SelectedTasksBar from "./SelectedTasksBar";


export default function TasksTable() {

  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTasks, setSelectedTasks] = useState<string[]>([]);
  const allSelected = selectedTasks.length === tasks.length && tasks.length > 0;
  const navigate = useNavigate();


  useEffect(() => {
    const getTasks = async () => {
      try {
        axios.get('https://tasks-mern-l4uf.onrender.com/api/tasks').then((response) => {
          setTasks(response.data);
          setIsLoading(false);
        })

      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    }
    getTasks();
  }, [])

  const deleteTask = async (id: string) => {
    const confirmed = window.confirm("Are you sure you want to delete this task?");
    if (!confirmed) return;

    try {
      await axios.delete(`https://tasks-mern-l4uf.onrender.com/api/tasks/${id}`);
      setTasks((prev) => prev.filter((task: Task) => task._id !== id));
      toast.success("Task deleted");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete task");
    }
  };

  const toggleSelectTask = (id: string) => {
    setSelectedTasks(prev =>
      prev.includes(id) ? prev.filter(taskId => taskId !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (allSelected) {
      setSelectedTasks([]);
    } else {
      setSelectedTasks(tasks.map(task => task._id));
    }
  };

  const deleteSelectedTasks = async () => {
    const confirmed = window.confirm(`Delete ${selectedTasks.length} selected tasks?`);
    if (!confirmed) return;

    try {
      await Promise.all(
        selectedTasks.map(id => axios.delete(`https://tasks-mern-l4uf.onrender.com/api/tasks/${id}`))
      );
      setTasks(prev => prev.filter(task => !selectedTasks.includes(task._id)));
      setSelectedTasks([]);
      toast.success("Selected tasks deleted");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete selected tasks");
    }
  };


  return (
    isLoading ? <Spinner aria-label="Content is loading" /> :
      tasks.length === 0 ? <NoTasks /> :

        <div className="overflow-x-auto max-w-fit">
          {selectedTasks.length > 0 && (
            <SelectedTasksBar
              selectedTasks={tasks.filter(task => selectedTasks.includes(task._id))}
              deleteSelectedTasks={deleteSelectedTasks}
            />
          )}
          <Table hoverable>
            <TableHead>
              <TableRow className="bg-gray-800 hover:bg-gray-700 text-gray-100 border-b border-gray-700">
                <TableHeadCell className="p-4">
                  <Checkbox
                    className="border border-solid border-white dark:border-white"
                    checked={allSelected}
                    onChange={toggleSelectAll}
                  />
                </TableHeadCell>
                <TableHeadCell>Title</TableHeadCell>
                <TableHeadCell>Description</TableHeadCell>
                <TableHeadCell>Priority</TableHeadCell>
                <TableHeadCell>Due Date</TableHeadCell>
                <TableHeadCell>
                  <div className="flex items-center gap-1">
                    <CiEdit />
                    <span>Edit</span>
                  </div>

                </TableHeadCell>
                <TableHeadCell>
                  <div className="flex items-center gap-1">
                    <MdDelete />
                    <span>Remove</span>
                  </div>

                </TableHeadCell>
              </TableRow>
            </TableHead>

            <TableBody className="divide-y">
              {[...tasks]
                .sort((a, b) => Number(a.completed) - Number(b.completed))
                .map((task: Task) => (
                  <TableRow key={task._id} className="bg-gray-800 hover:bg-gray-700 text-gray-100 border-b border-gray-700">
                    <TableCell className="p-4">
                      <Checkbox
                        className="border border-solid border-white dark:border-white"
                        checked={selectedTasks.includes(task._id)}
                        onChange={() => toggleSelectTask(task._id)}
                      />
                    </TableCell>

                    <TableCell className={`whitespace-nowrap font-medium ${task.completed ? 'line-through text-gray-400' : ''}`}>
                      {task.title}
                    </TableCell>

                    <TableCell className={`max-w-xs whitespace-pre-line text-sm break-words ${task.completed ? 'line-through text-gray-400' : 'text-gray-300'}`}>
                      {task.description}
                    </TableCell>

                    <TableCell className={`capitalize font-semibold ${task.priority === 'low' ? 'text-green-400' :
                      task.priority === 'medium' ? 'text-yellow-300' :
                        'text-red-400'
                      }`}>
                      {task.priority}
                    </TableCell>


                    <TableCell>
                      {
                        moment(task.dueDate).isBefore(moment())
                          ? <span className="text-red-400 font-semibold">Overdue</span>
                          : <span className="text-gray-300">{moment(task.dueDate).format('DD-MM-YYYY')}</span>
                      }
                    </TableCell>

                    <TableCell>
                      <div
                        className="flex items-center gap-2 text-blue-400 hover:text-blue-300 hover:underline cursor-pointer"
                        onClick={() => navigate(`/tasks/${task._id}`)}>
                        <CiEdit />
                        <span>Edit</span>
                      </div>
                    </TableCell>

                    <TableCell>
                      <div
                        className="flex items-center gap-2 text-red-400 hover:text-red-300 hover:underline cursor-pointer"
                        onClick={() => deleteTask(task._id)}>
                        <MdDelete />
                        <span>Remove</span>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}

            </TableBody>
          </Table>
        </div>

  );
}
