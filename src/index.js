const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

const router = require("./routes/Events");

const app = express();
dotenv.config();
app.use(express.json());

const mongo_url = process.env.MONGO_URL || "mongodb+srv://abhitehra:abhitehra@events.6xa7ekt.mongodb.net/?retryWrites=true&w=majority"

mongoose.connect(mongo_url).then(() => {
    console.log("Connected to Mongo DB Atlas");
})

app.use("/v1", router);

const port = parseInt(process.env.PORT || 8000);

app.listen(port, () => {
    console.log(`Server started at port ${port}`);
})