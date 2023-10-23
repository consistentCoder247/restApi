const express = require("express");
const app = express()
require("dotenv").config();
const port = process.env.PORT;
const mongoose = require("mongoose");

app.use(express.json());

const connection_string = process.env.DATABASE_URL;
mongoose.connect(connection_string, {useNewUrlParser: true});
const db = mongoose.connection;
db.on("error", (err)=> console.log(err.message));
db.once("open", ()=> console.log("Connected to Database"));

const subscriberRoute = require("./routes/subscribers");
app.use("/subscribers", subscriberRoute);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})