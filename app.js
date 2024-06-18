require("dotenv").config();

const mongoose = require("mongoose");
const express = require("express");
const passport = require("passport");

//passport config
require("./config/passport")(passport);

const app = express();

const port = process.env.PORT || 3000;
const mongDBUrl = process.env.MONGO_DB_URL;
// const path = require("path");

app.set("view engine", "ejs");

// app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//mongoDB connect
mongoose.connect(mongDBUrl)
    .then(() => console.log("mongo DB connected!"))
    .catch(err => console.log("monog DB not Connected:" + err));


app.get("/", (req, res) => {
    res.render("dashboard");
});

app.use("/auth", require("./routes/auth"));

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});     