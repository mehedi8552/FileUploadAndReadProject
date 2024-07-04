const express = require("express");
const multer = require("multer");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
var cors = require("cors");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());

mongoose
  .connect(
    "mongodb+srv://user8552:user8552@cluster0.derptwk.mongodb.net/RoleAuthByGPT"
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

// Image Upload Scema
const userScema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
});

const FileModel = mongoose.model("uploadfile", userScema);

const storage = multer.memoryStorage();

const upload = multer({ storage: storage });


app.post("/imageUpload", upload.single("image"), async (req, res) => {
  try {
    const data = new FileModel({
      name: req.body.name,
      image: req.file.buffer.toString("base64"),
    });
    let fromData = await data.save();
    res.status(200).json({
      status: "success",
      message: "File uploaded successfully",
      data: fromData
    });
  } catch (error) {
    res.status(200).json({
      status: "Faild",
      message: error.toString(),
    });
  }
});



app.get("/ReadUserData", async (req, res) => {
  try {
    const data = await FileModel.find();
    res.setHeader("Access-Control-Allow-Origin", req.headers.origin);
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.status(200).json(data);
  } catch (error) {
    res.setHeader("Access-Control-Allow-Origin", req.headers.origin);
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.status(500).json({
      status: "Faild",
      message: error.toString(),
    });
  }
});

// Start Server
app.listen(3000, () => {
  console.log("Server running on port 3000");
});
