import dbConnection from "./config/dbConnection";
import express from "express";
import auth from "./routes/auth";
import dash from "./routes/dash";
import attendanceRoutes from "./routes/attendance";
import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config";

const port = 3000;
const app = express();
app.use(
  cors({
    origin: [
      process.env.CLIENT_URL,
      process.env.ADMIN_URL,
      process.env.LOCAL_CLIENT_URL,
      process.env.LOCAL_ADMIN_URL,
    ],
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello Prajwol");
});

app.use("/auth", auth);
app.use("/attendance", attendanceRoutes);
app.use("/dash", dash);

app.listen(port, async () => {
  console.log("-------------------------------------");
  console.log(`Server is listening at ${port}`);

  await dbConnection;
});

export default app;
