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
const mongoUri = process.env.MONGO_URI || "mongodb://mongo:27017/election-portal";
console.log(`Attempting to connect to MongoDB with URI: ${mongoUri}`);
mongoose
  .connect(
    mongoUri,
    { 
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("MongoDB connected successfully!"))
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1); // Exit process with failure code
  });

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/elections", require("./routes/elections"));
app.use("/api/votes", require("./routes/votes"));


app.use(express.static(path.join(__dirname, "frontend", "build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "build", "index.html"));
});



const PORT = process.env.PORT || 8080; // Azure Web Apps often use 8080 or other specific ports
console.log(`Server attempting to listen on port ${PORT}`);
app.listen(PORT, () => console.log(`Server running on port ${PORT}. MongoDB URI: ${mongoUri}`));
