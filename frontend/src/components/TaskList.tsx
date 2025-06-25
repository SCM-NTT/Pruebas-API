import { useEffect, useState } from 'react';
import * as service from '../services/tasks';
import type { Task } from '../types/Task';

export default function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [finishedTasks, setFinishedTasks] = useState<Task[]>([]);
  const [error, setError] = useState<string>();


  // Funciones para cargar tareas y tareas finalizadas
  const loadTasks = () =>
    service.fetchTasks()
      .then(setTasks)
      .catch(err => setError(err.message));

  const loadFinishedTasks = () =>
    service.fetchFinishedTasks()
      .then(setFinishedTasks)
      .catch(err => setError(err.message));

  // Carga inicial de tareas y tareas finalizadas
  useEffect(() => {
    loadTasks();
    loadFinishedTasks();
  }, []);

  //funcion para cambiar el estado de una tarea (completada o no)
  const toggleTask = async (t: Task) => {
    try {
      await service.updateTask(t.id);
      loadTasks();
    } catch (err: any) {
      setError(err.message);
    }
  };

  const toggleFinishedTask = async (t: Task) => {
    try {
      await service.updatefinishedTask(t.id);
      loadFinishedTasks();
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await service.deleteTask(id);
      //recarga de página despues de eliminar:
      loadTasks();
      // eliminacion local sin pasar por api
      // setTasks(prev => prev.filter(t => t.id !== id));
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleDeleteFinished = async (id: number) => {
    try {
      await service.deleteFinishedTask(id);
      //recarga de página despues de eliminar:
      loadFinishedTasks();
      // eliminacion local sin pasar por api
      // setFinishedTasks(prev => prev.filter(t => t.id !== id));
    }
    catch (err: any) {
      setError(err.message);
    }
  };

  const handleMoveToFinished = async (t: Task) => {
    try {
      await service.moveTaskToFinished(t.id);
      //recarga de página despues de mover:
      loadTasks();
      loadFinishedTasks();
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleMoveToTasks = async (t: Task) => {
    try {
      await service.moveFinishedToTasks(t.id);
      //recarga de página despues de mover:
      loadTasks();
      loadFinishedTasks();
    } catch (err: any) {
      setError(err.message);
    }
  };

  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <div className='lista'>
        <div>

          <h2>Tareas a completar</h2>
          <button className='move' type='submit' onClick={async () => {
            try {
              await service.moveCompletedFromTasksToFinished();
              loadTasks();
              loadFinishedTasks();
            } catch (err: any) {
              setError(err.message)
            }
          }}>
            Mover tareas completadas a finalizadas ➡️
          </button>
          <ul>
            {tasks.map(t => (
              <li key={t.id} className='lista_tareas'>
                {t.completed ? '✅' : '❌'}
                <span
                  onClick={() => toggleTask(t)}
                  style={{
                    flex: 1,
                    cursor: 'pointer',
                    fontWeight: t.completed ? 'normal' : 'bold',
                    color: t.completed ? 'green' : 'white'
                  }}
                >
                  {t.title}
                </span>
                <button
                  onClick={() => handleDelete(t.id)}
                >
                  🗑️
                </button>

                <button
                  onClick={() => handleMoveToFinished(t)}
                >
                  ➡️
                </button>

              </li>
            ))}
          </ul>
          <button className='delete' type='submit' onClick={async () => {
            const confirm = window.confirm('¿Estás seguro de que quieres borrar todas las tareas completadas en vez de pasarlas a finalizadas?');
            if (!confirm) return;
            try {
              await service.deleteCompletedTasks();
              loadTasks()  // o setTasks(prev => prev.filter(t => !t.completed))
            } catch (err: any) {
              setError(err.message)
            }
          }}>
            🧹 Borrar tareas completadas
          </button>
        </div>
        <div>

          <h2>Tareas finalizadas</h2>

          <button className='move' type='submit' onClick={async () => {
            try {
              await service.moveIncompletedFromFinishedToTasks();
              loadTasks();
              loadFinishedTasks();
            } catch (err: any) {
              setError(err.message)
            }
          }}>
            ⬅️ Mover tareas incompletas a tareas
          </button>

          <ul>
            {finishedTasks.map(t => (
              <li key={t.id} className='lista_tareas'>
                <button
                  onClick={() => handleMoveToTasks(t)}
                >
                  ⬅️
                </button>
                {t.completed ? '✅' : '❓'}
                <span
                  onClick={() => toggleFinishedTask(t)}
                  style={{
                    flex: 1,
                    cursor: 'pointer',
                    fontWeight: t.completed ? 'bold' : 'normal',
                    color: t.completed ? 'green' : 'red'
                  }}
                >
                  {t.title}
                </span>
                <button
                  onClick={() => handleDeleteFinished(t.id)}
                >
                  🗑️
                </button>


              </li>
            ))}
          </ul>
          <button className='delete' type='submit' onClick={async () => {
            const confirm = window.confirm('¿Estás seguro de que quieres borrar todas las tareas finalizadas?');
            if (!confirm) return;
            try {
              await service.deleteFinishedCompletedTasks();
              loadFinishedTasks()  // o setTasks(prev => prev.filter(t => !t.completed))
            } catch (err: any) {
              setError(err.message)
            }
          }}>
            🧹 Borrar tareas terminadas completadas
          </button>
        </div>
      </div>
    </div>
  );
}
