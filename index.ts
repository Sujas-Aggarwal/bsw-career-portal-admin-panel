import express from "express";
import db from "./prisma/client";
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", express.static("public"));
app.get("/profiles", async (req, res) => {
  const profiles = await db.profiles.findMany();
  res.json(profiles);
});
app.get("/profile", async (req, res) => {
  res.send("ok lolz pakoda");
});
app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`);
});
