const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const postRoutes = require("./routes/posts");
dotenv.config();

mongoose.connect(process.env.DB_CONNECT);
const db=mongoose.connection;
db.on('error', (error) => {
    console.error('MongoDB connection error:', error);
});
db.once('open', () => {
    console.log('Connected to MongoDB');
});
db.on('disconnected', () => {
    console.log('Disconnected from MongoDB');
});

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/users", authRoutes);
app.use("/api/posts", postRoutes);

app.get("/", (req, res) => {
  res.send("<h1>hello from auth backend</h1>");
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Auth bakcend is running on port: ${port}`);
});
