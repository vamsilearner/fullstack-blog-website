const express = require("express");
const cors = require("cors"); // to avoid cors error
const mongoose = require("mongoose"); // to connect with monodb
const User = require("./models/User");
const Post = require("./models/Post");
const bcrypt = require("bcryptjs"); // 1. to hash a password
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const uploadMiddleware = multer({ dest: 'uploads/' });
const fs = require("fs"); // to change file name
const app = express();

const salt = bcrypt.genSaltSync(10); // 2. to hash a password & 3.in register hash password
const secret = "dsgzxvnibniobibirgsdvzc";
// middlewares
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.json());
app.use(cookieParser());

// mongodb
const mongoDb =
"mongodb+srv://vamsikrishnainn:yJjneFFWjwLH28xO@cluster0.cx4ji1l.mongodb.net/";
  // "mongodb+srv://vamsikrishnainn:@cluster0.olpbzrf.mongodb.net/";
  
const connectDatabase = () => {
  mongoose
    .connect(mongoDb, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((data) => {
      console.log(`mongod connected with server: ${data.connection.host}`);
    })
    .catch((error) => {
      console.error("Error connecting to MongoDB:", error);
    });
};

mongoose.set("debug", true);
connectDatabase();

app.get("/test", (req, res) => {
  res.send("Hello World! Test");
});

app.post("/register", async (req, res) => {
  // for register
  const { username, password } = req.body;
  try {
    const userDoc = await User.create({
      username,
      password: await bcrypt.hash(password, salt),
    });
    res.json(userDoc);
    res.status(200);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const userDoc = await User.findOne({ username });
  const passOk = bcrypt.compareSync(password, userDoc.password);
  if (passOk) {
    // logged in
    jwt.sign({ username, id: userDoc._id }, secret, {}, (err, token) => {
      if (err) throw err;
      res.cookie("token", token).json({
        id: userDoc._id,
        username,
        message: "Login successful",
      });
    });
  } else {
    res.status(400).json("wrong credentials");
  }
});

app.get("/profile", (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, secret, {}, (err, info) => {
    if (err) {
      res.status(401).json("Unauthorized");
      throw err;
    } else {
      res.json(info);
    }
  });
  res.json(req.cookies);
});

app.post("/logout", (req, res) => {
  res.cookie("token", "").json({ message: "Logout successful" });
});

app.post('/post', uploadMiddleware.single('file'), async function (req, res) {
  const { originalname, path } = req.file;
  const parts = originalname.split('.');
  const extension = parts[parts.length - 1];
  console.log(path,"path");
  const fileName = path.split('.');
  const newPath = fileName[0] + parts[0] + '.' + extension;
  fs.renameSync(path, newPath);
  const {title, summary, content} = req.body;
  const postDoc = await Post.create({
    title,
    summary,
    content,
    cover: newPath,
  })
  res.json(postDoc);

  // req.file is the `avatar` file
  // req.body will hold the text fields, if there were any
})

app.listen(4000, () => {
  console.log("Example app listening on port 4000!");
});
