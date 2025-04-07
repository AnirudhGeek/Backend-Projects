const mongoose = require("mongoose");

const connectToDb = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://annigeek:annigeek4014@cluster0.myuj0cp.mongodb.net/"
    );
    console.log("MongoDb is connected successfully");
  } catch (error) {
    console.error("MongoDb connection error", error);
    process.exit(1);
  }
};

module.exports = connectToDb;
