import { Router} from 'express';
import * as tareas from '../controllers/tasksController';

const router = Router();

router.get('/', tareas.getTasks); // ya en frontend/src/services/tasks.ts
router.post('/', tareas.createTask); // ya en frontend/src/services/tasks.ts
router.delete('/completed', tareas.deleteCompletedTasks); // ya en frontend/src/services/tasks.ts
router.patch('/:id', tareas.updateTask); // ya en frontend/src/services/tasks.ts
router.get('/finished', tareas.getFinishedTasks); // ya en frontend/src/services/tasks.ts
router.delete('/:id', tareas.deleteTask); // ya en frontend/src/services/tasks.ts
router.post('/move-completed', tareas.moveCompletedFromTasksToFinished); // ya en frontend/src/services/tasks.ts
router.post('/:id/finished', tareas.moveTaskToFinished); // ya en frontend/src/services/tasks.ts
router.post('/:id/move-finished', tareas.moveFinishedtoTasks); // ya en frontend/src/services/tasks.ts
router.patch('/finished/:id', tareas.updateFinishedTask); // ya en frontend/src/services/tasks.ts
router.delete('/finished/completed', tareas.deleteFinishedCompletedTasks); // ya en frontend/src/services/tasks.ts
router.delete('/finished/:id', tareas.deleteFinishedTask); // ya en frontend/src/services/tasks.t
router.post('/move-incomplete', tareas.moveIncompletedFromFinishedToTasks); // ya en frontend/src/services/tasks.ts

export default router;
