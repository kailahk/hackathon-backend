const express = require("express")
const cors = require("cors")

const app = express();
app.use(cors())

require("dotenv").config();
//require("./config/db.connection");

//saveuser
//getuser
//getcalender
//savecalender
//getnote
//savenote
//saveopneuiresponse
//getopenuiresponse
app.get("/", (req, res) => {
    res.send("Hello World");
  });