const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");

dotenv.config();
const app = express();
app.use(cors({ origin: process.env.CLIENT_URI, credentials: true }));
app.use(bodyParser.json());

app.use(cookieParser());

connectDB();

app.use("/api/auth", require("./route/AuthRoute"));
app.use("/api/user", require("./route/UserRoute"));
app.use("/api/words", require("./route/WordRoute"));
app.use("/api/pdf", require("./route/PDFRoute"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
