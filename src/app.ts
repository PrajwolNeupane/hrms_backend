import dbConnection from "./config/dbConnection";
import express from "express";
import auth from "./routes/auth";
import cookieParser from "cookie-parser";

const port = 3000;
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello Prajwol");
});

app.use("/auth", auth);

app.listen(port, async () => {
  console.log("-------------------------------------");
  console.log(`Server is listening at ${port}`);

  await dbConnection;
});
