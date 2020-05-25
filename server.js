const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const morgan = require('morgan');

/* App */

const app = express();

/* DB connection */

connectDB();

/* Init midleware */
app.use(express.json({ extended: false }));
app.use(morgan('dev'));
app.use(
  cors({ origin: 'http://localhost:3000', methods: 'GET, POST, PUT, DELETE' })
);

/* routes */

app.use((req, res) => {
  res.status(404).send({ message: '404 not found...' });
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`Server running on ${PORT} ^_^`));
