import { useEffect, useState } from 'react';
import { fetchTasks, updateTask, deleteTask, deleteCompletedTasks } from '../services/tasks';
import type { Task } from '../types/Task';

export default function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [error, setError] = useState<string>();

  const loadTasks = () =>
    fetchTasks()
      .then(setTasks)
      .catch(err => setError(err.message));

  useEffect(() => {
    loadTasks();
  }, []);

  const toggleTask = async (t: Task) => {
    try {
      await updateTask(t.id);
      loadTasks();
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteTask(id);
      //recarga de página despues de eliminar:
      loadTasks();
      // eliminacion local sin pasar por api
      // setTasks(prev => prev.filter(t => t.id !== id));
    } catch (err: any) {
      setError(err.message);
    }
  };

  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <button className='delete' type='submit' onClick={async () => {
        try {
          await deleteCompletedTasks();
          loadTasks()  // o setTasks(prev => prev.filter(t => !t.completed))
        } catch (err: any) {
          setError(err.message)
        }
      }}>
        🧹 Borrar tareas completadas
      </button>
      <ul>
        {tasks.map(t => (
          <li key={t.id} style={{ display: 'flex', alignItems: 'center' }}>
            {t.completed ? '✅' : '❌'}
            <span
              onClick={() => toggleTask(t)}
              style={{
                flex: 1,
                cursor: 'pointer',
                textDecoration: t.completed ? 'line-through' : 'none',
                fontWeight: t.completed ? 'normal' : 'bold',
              }}
            >
              {t.title}
            </span>
            <button
              onClick={() => handleDelete(t.id)}
              style={{
                alignSelf: 'center',
                alignContent: 'center',
                alignItems: 'center',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                color: 'red',
                fontSize: '1.2em'
              }}
              aria-label={`Borrar ${t.title}`}
            >
              🗑️
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
