const express = require('express');
require('dotenv').config();
const workoutRoutes = require('./Routes/workouts.js');  // Importing routes from routes folder
const userRoutes = require('./Routes/user.js'); 
const mongoose = require('mongoose');

// Express App
const app = express();

// Middleware
app.use(express.json());

app.use((req, res, next) => {
    console.log(req.path, req.method); // Log the request path and method
    next();
});

// Routes // Using the imported routes
app.use('/api/workouts', workoutRoutes);
app.use('/api/user', userRoutes);

// Connect to DB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    // Listening for requests
    app.listen(process.env.PORT, () => {
        console.log("Listening on,", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
