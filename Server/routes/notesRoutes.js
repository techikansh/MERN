const express = require("express");
const {addNote, editNote, getAllNotes, getNoteById, deleteNote} = require ("../controllers/notesController");
const { authenticateToken } = require("../utlities");

const router = express.Router();

router.post("/add-note", authenticateToken, addNote);
router.put("/edit-note/:noteId", authenticateToken, editNote);
router.get("/get-all-notes", authenticateToken, getAllNotes);
router.get("/get-note-by-id/:noteId", authenticateToken, getNoteById);
router.delete("/delete-note/:noteId", authenticateToken, deleteNote);

module.exports = router;