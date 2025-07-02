// src/components/EditTaskForm.tsx
import axios from "axios";
import { Button, Datepicker, Label, Select, Textarea, TextInput, ToggleSwitch } from "flowbite-react";
import { useEffect, useState, type FormEvent } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function EditTaskForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("medium");
  const [dueDate, setDueDate] = useState<Date>(new Date());
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    axios.get(`https://tasks-mern-l4uf.onrender.com/api/tasks/${id}`).then(({ data }) => {
      setTitle(data.title);
      setDescription(data.description);
      setPriority(data.priority);
      setDueDate(new Date(data.dueDate));
      setIsCompleted(data.completed);
    });
  }, [id]);

  const updateTask = async (e: FormEvent) => {
    e.preventDefault();

    try {
      await axios.put(`https://tasks-mern-l4uf.onrender.com/api/tasks/${id}`, {
        title,
        description,
        priority,
        dueDate,
        completed: isCompleted
      });

      toast.success("Task updated successfully");
      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update task");
    }
  };

  return (
    <form onSubmit={updateTask} className="flex max-w-md flex-col gap-4 w-full">
      <div>
        <Label htmlFor="title">Title</Label>
        <TextInput
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          id="title"
          placeholder="My task title"
          type="text"
        />
      </div>
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          id="description"
          required
        />
      </div>
      <div>
        <Label htmlFor="priority">Priority</Label>
        <Select
          id="priority"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </Select>
      </div>
      <div>
        <Label>Due date</Label>
        <Datepicker
          value={dueDate}
          onChange={(date) => date && setDueDate(date)}
        />
      </div>
      <div>
        <Label>Completed</Label>
        <ToggleSwitch checked={isCompleted} onChange={setIsCompleted} />
      </div>
      <div>
        <Button type="submit">Update Task</Button>
      </div>
    </form>
  );
}
