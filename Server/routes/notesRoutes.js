const express = require("express");
const {addNote, editNote, getAllNotes, getNoteById, deleteNote, searchNotes, pinNote} = require ("../controllers/notesController");
const { authenticateToken } = require("../utlities");

const router = express.Router();

router.post("/add-note", authenticateToken, addNote);
router.put("/edit-note/:noteId", authenticateToken, editNote);
router.get("/get-all-notes", authenticateToken, getAllNotes);
router.get("/get-note-by-id/:noteId", authenticateToken, getNoteById);
router.delete("/delete-note/:noteId", authenticateToken, deleteNote);
router.get("/search-notes", authenticateToken, searchNotes);
router.put("/pin-note/:noteId", authenticateToken, pinNote);


module.exports = router;