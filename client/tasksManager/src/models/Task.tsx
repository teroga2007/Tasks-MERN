export class Task {
  _id: string;
  title: string;
  description: string;
  priority: string;
  dueDate: Date;
  completed: boolean;

  constructor(_id: string, title: string, description: string, priority: string, dueDate: Date, completed: boolean) {
    this._id = _id;
    this.title = title;
    this.description = description;
    this.priority = priority;
    this.dueDate = dueDate;
    this.completed = completed;
  }
}