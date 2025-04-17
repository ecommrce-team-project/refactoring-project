const express = require("express");
const morgan = require("morgan");
require("dotenv").config({ path: "./utils/.env" });
require("./database/index.js");
const cors = require("cors");
const cookieParser = require('cookie-parser');
const createError = require("http-errors");
const path = require('path');

const app = express();
<<<<<<< HEAD
const port = process.env.SERVER_PORT || 3000;
=======
 app.use(morgan("dev"));

const port = 3000;

app.use(morgan('dev'))
app.use(express.urlencoded({extended:false}))
app.use(express.static(path.join(__dirname,'public')))


const userRoutes = require("./routes/User.routes.js");
const authRoutes = require("./routes/Auth.routes.js");
const paymentRouter = require("./routes/payment.routes.js");
const categoryRoutes = require("./routes/Category.routes.js");
const contactRoutes = require("./routes/Contact.routes.js");
const estateRoutes = require("./routes/Estate.routes.js");

>>>>>>> f92dc3c12d8f2cf3899f66af6725b629a3d00eb5

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