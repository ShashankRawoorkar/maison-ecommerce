const express = require('express');
const cors = require('cors');
const productRoutes = require('./routes/products');
const newsletterRoutes = require('./routes/newsletter');
const errorHandler = require('./middleware/errorHandler');

const app = express();

app.use(
  cors({
    origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'MAISON API is running' });
});

app.use('/api/products', productRoutes);
app.use('/api/newsletter', newsletterRoutes);

app.use(errorHandler);

module.exports = app;
