const express = require('express');
const app = express();
const port = 5000;
const itemRouter = require('./routes/route');

app.use(express.json());

app.use('/items', itemRouter);

// Menjalankan server
app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
});