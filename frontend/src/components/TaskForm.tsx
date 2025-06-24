import { useState, type FormEvent } from 'react'
import { addTask } from '../services/tasks'

interface Props {
  onNewTask: () => void
}

export default function TaskForm({ onNewTask }: Props) {
  const [title, setTitle] = useState('')

  const submit = async (e: FormEvent) => {
    e.preventDefault()
    if (!title.trim()) return
    await addTask(title)
    setTitle('')
    onNewTask()
  }

  return (
    <form onSubmit={submit}>
      <input
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="¿Qué hay que hacer?"
      />
      <button type="submit">Agregar</button>
    </form>
  )
}
