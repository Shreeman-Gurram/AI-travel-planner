const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const healthRoutes = require('./routes/healthRoutes');
const notFound = require('./middleware/notFound');
const errorHandler = require('./middleware/errorHandler');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', healthRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
