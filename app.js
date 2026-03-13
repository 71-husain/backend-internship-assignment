const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const {sequelize} = require("./models");
const authRoutes = require("./routes/authRoutes");
const projectRoutes = require("./routes/projectRoutes");
const dprRoutes = require("./routes/dprRoutes");

const app = express();

//routes controllers
app.use(express.json());
app.use("/auth", authRoutes);
app.use("/projects", projectRoutes);
app.use("/", dprRoutes);


sequelize.sync()
.then(() => {
    console.log("Database table created successfully.");
    app.listen(3000, () => {
        console.log("Server is running on port 3000");
    });
}).catch((error) => {
    console.error("Error creating database table:", error);
});   
