const express = require("express");
const urlRoute = require("./routes/url");
const { connectToMongoDb } = require("./connect");
const URL = require("./models/url");

const app = express();
const PORT = 7001;

//connnection
connectToMongoDb("mongodb://localhost:27017/shortening-url").then(() =>
  console.log("Connected to MonoDB Successfully")
);

//middlewares
app.use(express.json());

app.use("/url", urlRoute);

app.get("/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        viewHistory: {
          timestamp: Date.now(),
        },
      },
    }
);
res.redirect(entry.redirectURL)
});

app.listen(PORT, () => console.log(`Server started at port : ${PORT}`));
