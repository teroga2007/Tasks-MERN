
import axios from "axios";
import { Button, Datepicker, Label, Select, Textarea, TextInput, ToggleSwitch } from "flowbite-react";
import { useState, type FormEvent } from "react";
import toast from "react-hot-toast";

export default function NewTaskForm() {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("medium");
  const [dueDate, setDueDate] = useState<Date>(new Date());
  const [isCompleted, setIsCompleted] = useState(false);

  const createTask = async (e: FormEvent) => {
    e.preventDefault();

    if (!title || !description || !priority || !dueDate) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      await axios.post("https://tasks-mern-l4uf.onrender.com/api/tasks", {
        title,
        description,
        priority: priority.toLowerCase(),
        dueDate,
        completed: isCompleted
      });

      toast.success("Task created successfully");

      // Reset form
      setTitle("");
      setDescription("");
      setPriority("Medium");
      setDueDate(new Date());
      setIsCompleted(false);
    } catch (error) {
      console.error(error);
      toast.error("Failed to create task");
    }
  }

  return (
    <form onSubmit={(e) => createTask(e)} className="flex max-w-md flex-col gap-4 w-full">
      <div >
        <div className="mb-2 block">
          <Label htmlFor="title">Title</Label>
        </div>
        <TextInput
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          id="title"
          aria-label="Title"
          placeholder="My task title"
          type="text"
          sizing="md" />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="comment">Description</Label>
        </div>
        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          aria-label="Description"
          id="description"
          placeholder="My task is about..."
          required
          rows={4} />
      </div>
      <div className="max-w-md">
        <div className="mb-2 block">
          <Label htmlFor="countries">Priority</Label>
        </div>
        <Select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          aria-label="Priority"
          id="countries"
          required>
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </Select>
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="title">Due date</Label>
        </div>
        <Datepicker
          id="dueDate"
          value={dueDate ?? undefined}
          onChange={(date) => date && setDueDate(date)}
          minDate={new Date()}
          maxDate={new Date(2040, 3, 30)}
        />;
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="title">Completed</Label>
        </div>
        <ToggleSwitch aria-label="Completed" checked={isCompleted} onChange={setIsCompleted} />
      </div>
      <div>
        <Button aria-label="Create task" type="submit">Submit</Button >
      </div>
    </form>
  );
}
