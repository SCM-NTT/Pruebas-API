import { useState } from 'react'
import TaskList from './components/TaskList'
import TaskForm from './components/TaskForm'

export default function App() {
  const [refreshToggle, setRefreshToggle] = useState(false)

  return (
    <div >
      <h1>Gestor de Tareas</h1>
      <TaskForm onNewTask={() => setRefreshToggle(!refreshToggle)} />
      <TaskList key={String(refreshToggle)} />
    </div>
  )
}
