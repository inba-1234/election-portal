const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(
    process.env.MONGO_URI || "mongodb://mongo:27017/election-portal",
    { 
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/elections", require("./routes/elections"));
app.use("/api/votes", require("./routes/votes"));


app.use(express.static(path.join(__dirname, "frontend", "build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "build", "index.html"));
});



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
