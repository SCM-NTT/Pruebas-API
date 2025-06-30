import type { Task } from '../types/Task'

//const BASE = 'http://localhost:<puerto del backend>/api/tasks'
const BASE = import.meta.env.VITE_BACK_PORT

export async function fetchTasks(): Promise<Task[]> {
  const res = await fetch(BASE)
  if (!res.ok) throw new Error('Error cargando tareas')
  return res.json()
}

export async function fetchFinishedTasks(): Promise<Task[]> {
  const res = await fetch(`${BASE}/finished`)
  if (!res.ok) throw new Error('Error cargando tareas finalizadas') 
  return res.json()
}

export async function addTask(title: string): Promise<Task> {
  const res = await fetch(BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title })
  })
  if (!res.ok) throw new Error('Error creando tarea')
  return res.json()
}

export async function updateTask(
  id: number,
  completed?: boolean
): Promise<Task> {
  const res = await fetch(`${BASE}/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ completed })
  })
  if (!res.ok) throw new Error('Error al actualizar tarea')
  return res.json()
}

export async function updatefinishedTask(
  id: number,
  completed?: boolean
): Promise<Task> {
  const res = await fetch(`${BASE}/finished/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ completed })
  });
  if (!res.ok) throw new Error('Error al actualizar tarea finalizada');
  return res.json();
  
}

export async function deleteTask(id: number): Promise<void> {
  const res = await fetch(`${BASE}/${id}`, {
    method: 'DELETE'
  });
  if (!res.ok) {
    throw new Error('Error al borrar tarea');
  }
}

export async function deleteCompletedTasks(): Promise<void> {
  const res = await fetch(`${BASE}/completed`, {
    method: 'DELETE'
  });
  if (!res.ok) throw new Error('Error al borrar tareas completadas');
}

export async function moveTaskToFinished(id: number): Promise<Task> {
  const res = await fetch(`${BASE}/${id}/finished`, {
    method: 'POST'
  });
  if (!res.ok) throw new Error('Error al mover tarea a finalizadas');
  return res.json();
}

export async function moveFinishedToTasks(id: number): Promise<Task> {
  const res = await fetch(`${BASE}/${id}/move-finished`, {
    method: 'POST'
  });
  if (!res.ok) throw new Error('Error al mover tarea finalizada a tareas');
  return res.json();
}

export async function deleteFinishedTask(id: number): Promise<void> {
  const res = await fetch(`${BASE}/finished/${id}`, {
    method: 'DELETE'
  });
  if (!res.ok) throw new Error('Error al borrar tarea finalizada');
}

export async function deleteFinishedCompletedTasks(): Promise<void> {
  const res = await fetch(`${BASE}/finished/completed`, {
    method: 'DELETE'
  });
  if (!res.ok) throw new Error('Error al borrar tareas finalizadas completadas');
}

export async function moveCompletedFromTasksToFinished(): Promise<void> {
  const res = await fetch(`${BASE}/move-completed`, {
    method: 'POST'
  });
  if (!res.ok) throw new Error('Error al mover tareas completadas a finalizadas');
}

export async function moveIncompletedFromFinishedToTasks(): Promise<void> {
  const res = await fetch(`${BASE}/move-incomplete`, {
    method: 'POST'
  });
  if (!res.ok) throw new Error('Error al mover tareas incompletas de finalizadas a tareas');
}