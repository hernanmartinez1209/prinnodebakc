require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const axios = require('axios');
const btoa = require('btoa');
const cors = require('cors');
const printNodeRoutes = require('./routes/printnode'); // Importa el router de printnode

const app = express();
const port = process.env.PORT || 3001;

// Get your PrintNode API key from the environment variables
const printNodeApiKey = process.env.PRINTNODE_API_KEY;

if (!printNodeApiKey) {
    console.error('Error: PRINTNODE_API_KEY environment variable not set.');
    process.exit(1);
}

app.use(cors());
app.use(express.json({ limit: '5mb' }));

// Montar las rutas de PrintNode bajo el prefijo /api/printnode
app.use('/api/printnode', printNodeRoutes);

// Las siguientes rutas ahora están definidas en routes/printnode.js
// app.get('/api/printers', async (req, res) => {
//     try {
//         const response = await axios.get('https://api.printnode.com/printers', {
//             headers: {
//                 'Authorization': 'Basic ' + btoa(printNodeApiKey + ':')
//             }
//         });
//         res.json(response.data);
//     } catch (error) {
//         console.error('Error al obtener las impresoras:', error);
//         res.status(500).json({ error: 'No se pudieron obtener las impresoras' });
//     }
// });

// app.post('/api/print', async (req, res) => {
//     const { printerId, base64PdfData, title } = req.body;

//     if (!printerId || !base64PdfData) {
//         return res.status(400).json({ error: 'Faltan printerId o base64PdfData' });
//     }

//     try {
//         const response = await axios.post('https://api.printnode.com/printjobs', {
//             printerId: printerId,
//             contentType: 'pdf',
//             content: base64PdfData,
//             title: title || 'Documento para imprimir',
//             source: 'Tu sitio web Vanilla'
//         }, {
//             headers: {
//                 'Authorization': 'Basic ' + btoa(printNodeApiKey + ':'),
//                 'Content-Type': 'application/json'
//             }
//         });
//         res.json(response.data);
//     } catch (error) {
//         console.error('Error al enviar el trabajo de impresión:', error);
//         res.status(500).json({ error: 'No se pudo enviar el trabajo de impresión' });
//     }
// });

app.listen(port, () => {
    console.log(`Servidor backend escuchando en el puerto ${port}`);
});