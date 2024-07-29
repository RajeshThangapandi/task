require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./db");
const adminRoutes = require("./routes/admin");
const authRoutes = require("./routes/auth");
const UserRoutes = require("./routes/user");
const adminauthRoutes= require("./routes/adminauth");
const DataRoutes=require("./routes/data")
// database connection
connection();

// middlewares
app.use(express.json());
app.use(cors());

// routes
app.use("/api/admin", adminRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/adminauth", adminauthRoutes);
app.use("/api/user", UserRoutes);
app.use("/api/data",DataRoutes)

const port = process.env.PORT || 8080;
app.listen(port, console.log(`Listening on port ${port}...`));
