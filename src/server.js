require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();
connectDB();

app.use(cors());

const allowedOrigins = [process.env.FRONTEND_URL, "http://localhost:5173"];
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));

app.use(express.json());

app.use("/api/auth", require("./route/AuthRoute"));
app.use("/api/user", require("./route/UserRoute"));
app.use("/api/words", require("./route/WordRoute"));
app.use("/api/pdf", require("./route/PDFRoute"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);
