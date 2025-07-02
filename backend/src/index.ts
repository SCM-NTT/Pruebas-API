import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes';

import tasksRouter from './routes/tasks';


dotenv.config();

const app = express();
const PORT = process.env.BACK_PORT || 5000;

app.use(cors());
app.use(express.json());
app.use("/",userRoutes);
app.use('/api/tasks', tasksRouter);

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
