const express = require('express');
const app = express();
const mongoose = require('mongoose');
const prisma = require('@prisma/client');

app.use(express.json());

// Example route
app.get('/', (req, res) => {
    res.send('Backend API working');
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
