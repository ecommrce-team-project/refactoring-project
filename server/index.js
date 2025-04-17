const express = require("express");
const morgan = require("morgan");
require("dotenv").config({ path: "./utils/.env" });
require("./database/index.js");
const cors = require("cors");
const cookieParser = require('cookie-parser');
const createError = require("http-errors");
const path = require('path');

const app = express();

const port = process.env.SERVER_PORT || 3000;


// Middleware
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(cors({
    origin: ["http://localhost:3001", "http://localhost:3005"],
    credentials: true,
}));

// Import routes
const userRoutes = require("./routes/user.routes");
const authRoutes = require("./routes/auth.routes");
const downPaymentRoutes = require("./routes/downPayment.routes");
const categoryRoutes = require("./routes/category.routes");
const contactRoutes = require("./routes/contact.routes");
const estateRoutes = require("./routes/estate.routes");


// Use routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/estates", estateRoutes);
app.use("/api/down-payments", downPaymentRoutes);

// Error handling
app.use((req, res, next) => {
    next(createError.NotFound());
});

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
        error: {
            status: err.status || 500,
            message: err.message,
        },
    });
});

app.listen(port, () => {
    console.log(`Server running on http://127.0.0.1:${port}`);
});

module.exports = app;