import Express from "express";
import dbConnection from "./db/dbConnection.js";
import {} from "dotenv/config.js";
import cors from "cors";
import path from "path";
import cookieParser from "cookie-parser";
import root from "./router/root.js";
import authrouter from "./router/authRouter.js";

const app = Express();
const PORT = 3000;
const __dirname = path.resolve();

const corsConfig = {
  credentials: true,
  origin: true,
};

app.use(cors(corsConfig));
app.use(Express.json());
app.use(cookieParser());
app.use("/", Express.static(path.join(__dirname, "public")));
app.use("/", root);
app.use("/api/v1", authrouter)


app.all("*", (req, res) => {
    res.status(404);
    if (req.accepts("html")) {
      res.sendFile(path.join(__dirname, "views", "404.html"));
    } else if (req.accepts("json")) {
      res.json({ message: "404 Not Found" });
    } else {
      res.type("txt").send("404 Not Found");
    }
  });
  
  const connection = () => {
    try {
      dbConnection(process.env.DB_URL);
      app.listen(PORT, () => {
        console.log(`Server is running at http://localhost:${PORT}`);
        console.log("DB Connected");
      });
    } catch (error) {
      console.log("Error in connecting to DB", error);
    }
  };
  
  connection();