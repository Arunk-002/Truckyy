require("dotenv").config();
const cors = require("cors");
const mongoose = require("mongoose");
const express = require("express");
const userRoutes = require("./routes/userRoute");
const truckRoutes = require("./routes/truckRoute")
const app = express();

app.use( cors({
  origin: process.env.FRONT_END_URL, // Frontend URL
  credentials: true, 
  allowedHeaders: ["Content-Type", "Authorization"],
}));
app.use(express.json());
app.use("/users", userRoutes);
app.use("/trucks",truckRoutes)

//db connettion
const dbConnect = () => {
  mongoose.connect(process.env.MONGO_URL);
  console.log("Database Connected");
};

app.listen(process.env.PORT, () => {
  dbConnect();
  console.log("server started at", process.env.PORT);
});
