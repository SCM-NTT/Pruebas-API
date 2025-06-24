import { Request, Response, NextFunction } from 'express';
import { nextTick } from 'process';

interface Task {
  id: number;
  title: string;
  completed: boolean;
}

let tasks: Task[] = [
  { id: 1, title: 'Completar y eliminar esta tarea', completed: false }
];

// GET /api/tasks
export function getTasks(req: Request, res: Response , next: NextFunction):void {
  res.json(tasks);
}

// POST /api/tasks
export function createTask(req: Request, res: Response , next: NextFunction):void  {
  const { title } = req.body;
  const newTask: Task = {
    id: tasks.length + 1,
    title,
    completed: false
  };
  tasks.push(newTask);
  res.status(201).json(newTask);
}

// DELETE /api/tasks/:id
export function deleteTask(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const id = Number(req.params.id);
  const index = tasks.findIndex(t => t.id === id);

  if (index === -1) {
    res.status(404).json({ message: 'Tarea no encontrada' });
    return ;
  }

  tasks.splice(index, 1);           // la quita del array
  res.status(204).send();    // 204 No Content
  return;
};

// PATCH /api/tasks/:id
export function updateTask(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const id = Number(req.params.id);
  const { completed } = req.body as { completed?: boolean };

  const task = tasks.find(t => t.id === id);
  if (!task) {
    res.status(404).json({ message: 'Tarea no encontrada' });
    return;
  }

  task.completed = typeof completed === 'boolean'
    ? completed
    : !task.completed;

  res.json(task);
}

// DELETE /api/tasks/completed
export function deleteCompletedTasks(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const before = tasks.length;
  tasks = tasks.filter(t => !t.completed);
  const removed = before - tasks.length;
  res.status(200).json({ removed });
};

