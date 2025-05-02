require('dotenv').config(); // Carga las variables de entorno desde el archivo .env
const express = require('express');
const cors = require('cors');
const printNodeRoutes = require('./routes/printnode'); // Importa el router de PrintNode

const app = express();
const port = process.env.PORT || 3000; // Usa el puerto de Render o 3000 por defecto

// Middleware
app.use(cors());
app.use(express.json({ limit: '5mb' }));

// Rutas
app.use('/api/printnode', printNodeRoutes); // Monta las rutas de PrintNode

// Ruta de inicio (opcional, para verificar que el servidor está funcionando)
app.get('/', (req, res) => {
  res.send('¡La API está funcionando!');
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor backend escuchando en el puerto ${port}`);
});
