import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import tasksRouter from './routes/tasks';
dotenv.config();
const app = express();
const PORT = process.env.BACK_PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/api/tasks', tasksRouter);

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
