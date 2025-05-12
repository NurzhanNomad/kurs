const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());

app.get('/nbkr', async (req, res) => {
    try {
        const response = await fetch('https://www.nbkr.kg/XML/daily.xml');
        if (!response.ok) {
            return res.status(500).send('Ошибка при получении данных с НБКР');
        }
        const xml = await response.text();
        res.set('Content-Type', 'application/xml');
        res.send(xml);
    } catch (err) {
        res.status(500).send('Ошибка сервера: ' + err.message);
    }
});

app.get('/', (req, res) => {
    res.send('NBKR Proxy работает! Используйте /nbkr для получения XML.');
});

app.listen(PORT, () => {
    console.log(`NBKR Proxy сервер запущен на http://localhost:${PORT}/nbkr`);
}); 