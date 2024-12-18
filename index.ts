import express from "express";
import {ProfileRouter} from "./src/routes/profile";
import path from "path";
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", express.static("public"));
app.use("/profiles", ProfileRouter);
app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`);
});
