const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Cargar variables de entorno desde .env
dotenv.config();

// Conectar a la base de datos
connectDB();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use('/api/tasks', require('./routes/taskRoutes'));

// Rutas
app.get('/', (req, res) => {
  res.send('API funcionando');
});


const errorHandler = require('./middleware/errorHandler');
app.use(errorHandler);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en puerto ${PORT}`);
});