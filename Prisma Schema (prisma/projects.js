 routes/projects.js

const router2 = require("express").Router();
const auth = require("../middleware/auth");
const { PrismaClient } = require("@prisma/client");

const prisma2 = new PrismaClient();

router2.post("/", auth, async (req, res) => {
  if (req.user.role !== "admin") return res.status(403).json({ message: "Forbidden" });

  const project = await prisma2.project.create({
    data: {
      name: req.body.name,
      description: req.body.description,
      createdBy: req.user.id
    }
  });

  res.json(project);
});

router2.get("/", auth, async (req, res) => {
  const projects = await prisma2.project.findMany();
  res.json(projects);
});

module.exports = router2;
