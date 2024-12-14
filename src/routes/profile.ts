import express from "express";
import db from "../../prisma/client";
import { Profile } from "../../schema/profile";
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const profiles = await db.profiles.findMany();
    res.json(profiles);
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "Something went wrong" });
  }
});

router.post("/new", async (req, res) => {
  try {
    const { name } = req.body;
    const newProfile = await db.profiles.create({
      data: {
        name,
      },
    });
    res.json(newProfile);
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "Something went wrong" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const profile = await db.profiles.delete({
      where: {
        id,
      },
    });
    res.json(profile);
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "Something went wrong" });
  }
});
router.put("/:id", async (req, res) => {
  try {
    const NewProfile:Profile = req.body as Profile;
    console.log(NewProfile);
    const updatedProfile = await db.profiles.update({
      data: {
        name: NewProfile?.name,
        name2: NewProfile?.name2,
        cover_image: NewProfile?.cover_image,
        bg_image: NewProfile?.bg_image,
        overview: NewProfile?.overview,
        readmore: NewProfile?.readmore,
        payscale: NewProfile?.payscale,
        branches: NewProfile?.branches,
        skills: NewProfile?.skills,
        trajectory: NewProfile?.trajectory,
        resume: NewProfile?.resume,
        companies: NewProfile?.companies,
        resources: NewProfile?.resources,
      },
      where: {
        id: req.params.id,
      },
    });
    res.json(updatedProfile);
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "Something went wrong" });
  }
});

export { router as ProfileRouter };
