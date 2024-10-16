const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const path = require("path");
const expressSession= require('express-session');
const flash = require("connect-flash")

const ownersRouter = require("./routes/ownersRouter");
const usersRouter = require("./routes/usersRouter");
const productsRouter = require("./routes/productsRouter");
const isLoggedin = require("./middlewares/isLoggedin");
const indexRouter= require("./routes/index");

require("dotenv").config();

const db = require("./config/mongoose-connection");
const { error } = require("console");
const productModel = require("./models/product-model");

app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());
app.use(
    expressSession({
        resave:false,
        saveUninitialized:false,
        secret: process.env.JWT_KEY
    })
)
app.use(flash());

app.use("/",indexRouter);
app.use("/owners", ownersRouter);
app.use("/users", usersRouter);
app.use("/products", productsRouter);


app.listen(3000);
