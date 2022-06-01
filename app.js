require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');
const mongoose = require("mongoose");
const passport = require('passport');
const session = require('express-session');
const cookieParser = require("cookie-parser");
const methodOverride = require("method-override");
const path = require("path");
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const app = express();

// app.use(cors());
// app.use(require('morgan')('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname + '/views'));
app.set('view engine', 'ejs');

app.use(cookieParser());
app.use(methodOverride('_method'));


app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use((req, res, next) => {
    res.locals.isAuthenticated = req.isAuthenticated() || req.session.isLoggedIn;
    next();
});


const keys = require("./config/keys");
mongoose.Promise = global.Promise;
mongoose.connect(keys.mongoURI)
    .then(() => console.log("MongoDB connected successfully"))
    .catch((err) => console.log("err"));


app.use("/", require("./routes/index"));
app.use("/products", require("./routes/products"));
app.use("/comment", require("./routes/comment"));
app.use("/contacts", require("./routes/contacts"));
app.use("/auth", require("./routes/auth"));
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

module.exports = app;