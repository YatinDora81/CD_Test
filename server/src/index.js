import express from "express";
import { config } from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
const PORT = 3000;
config();
const allowedOrigins = [
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "https://prod-mern.yatindora.xyz",
  "https://staging-mern.yatindora.xyz",
];

app.use(express.json());    
app.use(cookieParser()); 

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, // if you're using cookies
  })
);

app.get("/", (req, res) => {
  res.cookie("auth", "zesxredctfbuin", {
    httpOnly: true,
    secure: true,
    sameSite: "Strict",
  });
  res
    .status(200)
    .json(JSON.stringify(
      "Hello from the server and also set cookie" +
        "also the new var is " +
        process.env.MESSAGE)
    );
});

app.get(
  "/check",
  (req, res, next) => {
    const cookie = req.cookies.auth;
    if (cookie) {
      next();
    } else {
      res.status(401).json({ message: "No cookie found" });
    }
  },
  (req, res) => {
    res.status(200).json({ message: "Cookie is present" });
  }
);


app.get("/fun" , (req,res)=>{
  res.status(200).json({
    message  : "Just for fun"
  })
})

app.listen(PORT, () => {
  console.log(`APP running at ${PORT}`);
});
