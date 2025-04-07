require("dotenv").config();
const express = require("express");
const connectToDb = require("./database/db");
const bookRoutes = require("./routes/books-routes");

const app = express();

const PORT = process.env.PORT || 3000;

//connnect to our database => databse->db.js
connectToDb();

//middleware
// express.json => this middleware will parse our json information
app.use(express.json());

//routes 
app.use("/api/books", bookRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on the port : ${PORT}`);
});
