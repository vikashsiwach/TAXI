const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors');
const app = express();
const connectToDb = require('./db/db');
const userRoutes = require('./routes/user.routes');
const cookieParser = require('cookie-parser');
const captainRoutes = require('./routes/captain.routes');
const mapRoutes = require('./routes/map.routes');

connectToDb();

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/users', userRoutes);
app.use('/captains', captainRoutes);
app.use('/map', mapRoutes);


app.get('/', (req, res) => {
  res.send('Hello World!');
});

module.exports = app;