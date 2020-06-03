const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const morgan = require('morgan');

/* Routes imports */

const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const projectRoutes = require('./routes/project.routes');

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
app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.use('/api', projectRoutes);

app.use((req, res) => {
  res.status(404).send({ message: '404 not found...' });
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`Server running on ${PORT} ^_^`));
