const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
// const morgan = require('morgan');
const path = require('path');

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
// app.use(morgan('dev'));
app.use(
  cors({
    origin: 'http://localhost:3000',
    methods: 'GET, POST, PUT, PATCH, DELETE',
  })
);

/* routes */
app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.use('/api', projectRoutes);

//serv static in prod
if (process.env.NODE_ENV === 'production') {
  //set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'clietn', 'build', 'index.html'));
  });
}

app.use((req, res) => {
  res.status(404).send({ message: '404 not found...' });
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`Server running on ${PORT} ^_^`));
