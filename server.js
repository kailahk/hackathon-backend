const express = require("express")
const cors = require("cors")

const app = express();
const infoController = require("./controllers/info-controller")
app.use(cors())
app.use(express.json());
var logger = require('morgan');
require("dotenv").config();
require("./config/db.connection");


app.use("/info", infoController)
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());
app.get("/", (req, res) => {
    res.send("Hello World");
  });

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));