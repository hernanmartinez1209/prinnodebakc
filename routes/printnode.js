const express = require('express');
const axios = require('axios');
const btoa = require('btoa');

const router = express.Router();

// Obtener la clave de API de las variables de entorno (asegúrate de que esté configurada en .env)
const printNodeApiKey = process.env.PRINTNODE_API_KEY;

// Middleware para autenticación (opcional, pero se puede usar para todas las rutas de PrintNode)
const authenticate = (req, res, next) => {
    if (!printNodeApiKey) {
        console.error('Error: PRINTNODE_API_KEY no está configurada.');
        return res.status(500).json({ error: 'Clave de API no configurada en el servidor.' });
    }
    next();
};

// Aplicar el middleware a todas las rutas de este archivo (opcional)
router.use(authenticate);

// Ruta para obtener la lista de impresoras
router.get('/printers', async (req, res) => {
    try {
        const response = await axios.get('https://api.printnode.com/printers', {
            headers: {
                'Authorization': 'Basic ' + btoa(printNodeApiKey + ':')
            }
        });
        res.json(response.data);
    } catch (error) {
        console.error('Error al obtener las impresoras:', error);
        res.status(500).json({ error: 'No se pudieron obtener las impresoras' });
    }
});

// Ruta para enviar un trabajo de impresión
router.post('/print', async (req, res) => {
    const { printerId, base64PdfData, title } = req.body;

    if (!printerId || !base64PdfData) {
        return res.status(400).json({ error: 'Faltan printerId o base64PdfData' });
    }

    try {
        const response = await axios.post('https://api.printnode.com/printjobs', {
            printerId: printerId,
            contentType: 'pdf',
            content: base64PdfData,
            title: title || 'Documento para imprimir',
            source: 'Tu sitio web Vanilla'
        }, {
            headers: {
                'Authorization': 'Basic ' + btoa(printNodeApiKey + ':'),
                'Content-Type': 'application/json'
            }
        });
        res.json(response.data);
    } catch (error) {
        console.error('Error al enviar el trabajo de impresión:', error);
        res.status(500).json({ error: 'No se pudo enviar el trabajo de impresión' });
    }
});

module.exports = router;