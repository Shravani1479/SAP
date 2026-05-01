routes/tasks.js

const router3 = require("express").Router();
const auth2 = require("../middleware/auth");
const { PrismaClient } = require("@prisma/client");

const prisma3 = new PrismaClient();

router3.post("/", auth2, async (req, res) => {
  if (req.user.role !== "admin") return res.status(403).json({ message: "Forbidden" });

  const task = await prisma3.task.create({
    data: req.body
  });

  res.json(task);
});

router3.patch("/:id", auth2, async (req, res) => {
  const task = await prisma3.task.findUnique({ where: { id: req.params.id } });

  if (task.assignedTo !== req.user.id)
    return res.status(403).json({ message: "Not your task" });

  const updated = await prisma3.task.update({
    where: { id: req.params.id },
    data: { status: req.body.status }
  });

  res.json(updated);
});

module.exports = router3;
