import { Request, Response, NextFunction } from 'express';

interface Task {
  id: number;
  title: string;
  completed: boolean;
}

let tasks: Task[] = [
  { id: 1, title: 'Completar haciendo click y pasarla a "Tareas finalizadas" o borrarla', completed: false }
];

let finishedtasks: Task[] = [
  { id: 2, title: 'Tarea terminada, prueba a clickarla y devolverla a "Tareas a completar"', completed: true }
];

// GET /
export function getTasks(req: Request, res: Response, next: NextFunction): void {
  res.json(tasks);
}

// GET /finished
export function getFinishedTasks(req: Request, res: Response, next: NextFunction): void {
  res.json(finishedtasks);
}

// POST /
/**
 * Crea una nueva tarea y la añade a la lista de tareas.
 * La tarea se crea con un ID único, un título y el estado de completada en falso.
 * @param req - Request object
 * @param res - Response object
 * @param next - Next function for error handling
*/
export function createTask(req: Request, res: Response, next: NextFunction): void {
  const { title } = req.body;
  const newTask: Task = {
    id: tasks.length + finishedtasks.length + 1,
    title,
    completed: false
  };
  tasks.push(newTask);
  res.status(201).json(newTask);
}


// POST /api/tasks/:id/finished
// Mueve una tarea a la lista de tareas finalizadas
export function moveTaskToFinished(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const id = Number(req.params.id);
  const index = tasks.findIndex(t => t.id === id);
  if (index === -1) {
    res.status(404).json({ message: 'Tarea no encontrada' });
    return;
  }
  const task = tasks[index];
  tasks.splice(index, 1); // la quita del array de tareas
  task.completed = true; // marca la tarea como completada
  finishedtasks.push(task); // la añade al array de tareas finalizadas
  res.status(200).json(task); // devuelve la tarea movida
}

// POST /api/tasks/:id/move-finished
// Mueve una tarea finalizada de vuelta a la lista de tareas
export function moveFinishedtoTasks(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const id = Number(req.params.id);
  const index = finishedtasks.findIndex(t => t.id === id);
  if (index === -1) {
    res.status(404).json({ message: 'Tarea finalizada no encontrada' });
    return;
  }
  const task = finishedtasks[index];
  finishedtasks.splice(index, 1); // la quita del array de tareas finalizadas
  task.completed = false; // marca la tarea como no completada
  tasks.push(task); // la añade al array de tareas
  res.status(200).json(task); // devuelve la tarea movida
}

// DELETE /:id
// Elimina una tarea por su ID
export function deleteTask(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const id = Number(req.params.id);
  const index = tasks.findIndex(t => t.id === id);

  if (index === -1) {
    res.status(404).json({ message: 'Tarea no encontrada' });
    return;
  }

  tasks.splice(index, 1);           // la quita del array
  res.status(204).send();    // 204 No Content
  return;
};

// DELETE /finished/:id
// Elimina una tarea finalizada por su ID
export function deleteFinishedTask(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const id = Number(req.params.id);
  const index = finishedtasks.findIndex(t => t.id === id);
  if (index === -1) {
    res.status(404).json({ message: 'Tarea finalizada no encontrada' });
    return;
  }
  finishedtasks.splice(index, 1); // la quita del array de tareas finalizadas
  res.status(204).send(); // 204 No Content
  return;
}

// PATCH /:id
// Actualiza el estado de una tarea (completada o no)
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

export function updateFinishedTask(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const id = Number(req.params.id);
  const { completed } = req.body as { completed?: boolean };

  const task = finishedtasks.find(t => t.id === id);
  if (!task) {
    res.status(404).json({ message: 'Tarea finalizada no encontrada' });
    return;
  }

  task.completed = typeof completed === 'boolean'
    ? completed
    : !task.completed;

  res.json(task);
}

// DELETE /completed
// Elimina las tareas que están marcadas como completadas
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

// DELETE /finished/completed
// Elimina las tareas finalizadas que están marcadas como completadas
export function deleteFinishedCompletedTasks(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const before = finishedtasks.length;
  finishedtasks = finishedtasks.filter(t => !t.completed);
  const removed = before - finishedtasks.length;
  res.status(200).json({ removed });
}

// POST /finished/completed
export function moveCompletedFromTasksToFinished(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const completedTasks = tasks.filter(t => t.completed);
  if (completedTasks.length === 0) {
    res.status(200).json({ message: 'No hay tareas completadas para mover' });
    return;
  }
  finishedtasks.push(...completedTasks);
  tasks = tasks.filter(t => !t.completed);
  res.status(200).json({ moved: completedTasks.length });
}

// POST /move-incomplete
export function moveIncompletedFromFinishedToTasks(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const incompletedTasks = finishedtasks.filter(t => !t.completed);
  if (incompletedTasks.length === 0) {
    res.status(200).json({ message: 'No hay tareas incompletas para mover' });
    return;
  }
  
  tasks.push(...incompletedTasks);
  finishedtasks = finishedtasks.filter(t => t.completed);
  
  res.status(200).json({ moved: incompletedTasks.length });
}
