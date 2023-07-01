require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const cors = require('cors')
const path = require('path')

// Middleware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors({
    origin: '*' // TODO: Change to production URL when deployed
}))

// Database
require('./db/dbConnect')()

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/user', require('./routes/userRoutes'));
app.use('/api/course', require('./routes/courseRoutes'));

if (process.env.NODE_ENV != "production") {
    app.use(express.static(path.resolve(__dirname, "./client/build")));
    app.get("*", function (request, response) {
        response.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
}

// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`✅ Server listening on port ${PORT}`);
});
