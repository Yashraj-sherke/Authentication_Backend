import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import db from "./src/utils/db.js";
import userRouter from "./src/routes/user.routes.js";

dotenv.config();

const PORT = process.env.PORT || 8080;

// Initialize Express App
const app = express();

// Middleware jo check karega valid client backend use kar raha hai ya nhi
app.use(cors({
    origin: process.env.BASE_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"]
})
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

db();

app.use("/api/v1/user", userRouter); // User related routes

app.use(express.json());  //yhn par hum body se data ko access karne ke liye express.json() middleware use kar rahe hain
app.use(express.urlencoded({ extended: true })); //yhn par url se data ko access karne ke liye express.urlencoded() middleware use kar rahe hain

app.get("/", (req, res) => {
  res.send("Hello World! App Created Successfully");
});

const registerUser =(req, res) => {
  // Registration logic goes here
  const {name,email,password} = req.body;
  console.log(`Name: ${name}`);
  console.log(`Email: ${email}`);
  console.log(`Password: ${password}`);
 
  const id = req.params?.id;
  console.log(`User ID: ${id}`);

  res.status(201).json("User registered successfully");
}

app.post("/register/:userId", registerUser);

// Home Route
app.get("/home", (req, res) => {
  res.send("This is a home page");
});

app.get("/about", (req, res) => {
  res.send("This is an about page");
});

app.get("/YashCoder", (req, res) => {
  res.send("This is YashCoder's page");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
