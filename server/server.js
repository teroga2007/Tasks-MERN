const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');

const connectDB = require('./config/db.js');
const taskRoutes = require('./routes/taskRoutes');

// Middleware CORS
app.use(cors(
  {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true, // Allow cookies to be sent
  }
));

// Middleware parse json
app.use(express.json());

// Routes
app.use('/api/tasks', taskRoutes);

dotenv.config();

const port = process.env.PORT || 3000;

connectDB().then(() => app.listen(port, () => {
  console.log(`Server started on port ${port}`);
}));