const express = require("express");
const router = express.Router();
const Note = require("../models/Note");

// CREATE
router.post("/", async (req, res) => {
  try {
    const note = await Note.create(req.body);
    res.json(note);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// READ
router.get("/", async (req, res) => {
  const notes = await Note.find().sort({ createdAt: -1 });
  res.json(notes);
});

// UPDATE
router.put("/:id", async (req, res) => {
  try {
    const updated = await Note.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  try {
    await Note.findByIdAndDelete(req.params.id);
    res.json({ message: "Note deleted" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
