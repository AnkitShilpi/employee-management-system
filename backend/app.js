require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./utils/db');

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/employee', require('./routes/empRoutes'));

app.post('/test', (req, res) => {
  console.log('Received body:', req.body);
  res.json({ receivedBody: req.body });
});


module.exports = app;
