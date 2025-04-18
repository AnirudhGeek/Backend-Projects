const express = require("express");
const path = require("path");
const cookieParser  = require("cookie-parser")
const { connectToMongoDB } = require("./connect");
const { restrictToLoggedInUserOnly } = require('./middlewares/auth')

const URL = require("./models/url");

const urlRoute = require("./routes/url");
const staticRoute = require("./routes/staticRouter");
const userRoute = require("./routes/user");

const app = express();
const PORT = 8001;

connectToMongoDB("mongodb://localhost:27017/short-url").then(() =>
  console.log("MongoDB Connected")
);

app.use(express.json());
app.use(express.urlencoded({ extended: false })); //this middleware is use to support form data
app.use(cookieParser())
// //server side rendering => when the HTML/webpage is rendered by the server
// //to solve server side rendering we use some templating engines like ejs, pug and handlebars

app.set("view engine", "ejs"); //we are telling express that our view engine is express
app.set("views", path.resolve("./views")); //and all my files and files are made particularly in this folder

// app.get("/test", async (req, res) => {
//   const allUrls = await URL.find({});
//   console.log("URLs fetched from DB:", allUrls); // Debugging line

//   return res.render("home", {
//     urls: allUrls, // Ensure this contains shortId
//   });
// });

app.use("/url", restrictToLoggedInUserOnly, urlRoute);
app.use("/user", userRoute);
app.use("/", staticRoute);
app.get("/:shortId", async (req, res) => {
  const shortId = req.params.shortId;

  const entry = await URL.findOneAndUpdate(
    { shortId },
    {
      $push: {
        visitHistory: { timestamp: Date.now() },
      },
    },
    { new: true } // Ensure it returns the updated document
  );

  if (!entry) {
    return res.status(404).json({ error: "Short URL not found" });
  }

  res.redirect(entry.redirectURL);
});

app.listen(PORT, () => {
  console.log(`Server is running on port : ${PORT}`);
});
