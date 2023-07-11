const express = require("express")
const cors = require("cors")

const app = express();
const infoController = require("./controllers/info-controller")
app.use(cors())
app.use(express.json());
// var logger = require('morgan');
require("dotenv").config();
require("./config/db.connection");

//saveuser
//getuser
//getcalender
//savecalender
//getnote
//savenote
//saveopneuiresponse
//getopenuiresponse
app.use("/info", infoController)
app.get("/", (req, res) => {
    res.send("Hello World");
  });

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));