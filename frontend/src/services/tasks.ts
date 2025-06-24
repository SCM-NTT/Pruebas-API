import type { Task } from '../types/Task'

const BASE = 'http://localhost:5000/api/tasks'

export async function fetchTasks(): Promise<Task[]> {
  const res = await fetch(BASE)
  if (!res.ok) throw new Error('Error cargando tareas')
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

export async function deleteTask(id: number): Promise<void> {
  const res = await fetch(`${BASE}/${id}`, {
    method: 'DELETE'
  });
  if (!res.ok) {
    throw new Error('Error al borrar tarea');
  }
}

