const Note = require("../models/note.model");

async function addNote(req, res) {
  const { title, content, isPinned } = req.body;
  const { isUser } = req.user;

  if (!title) {
    return res
      .status(400)
      .json({ error: true, message: "Title is required :(" });
  }

  if (!content) {
    return res
      .status(400)
      .json({ error: true, message: "Content is required :(" });
  }

  try {
    const newNote = new Note({ title, content, userId: isUser._id });

    newNote.save();
    return res
      .status(201)
      .json({ error: false, newNote, message: "Note added successfully :)" });
  } catch (error) {
    return res
      .status(500)
      .json({ error: true, message: "Internal Server Error :(" });
  }
}

async function editNote(req, res) {
  const noteId = req.params.noteId;
  const { title, content, isPinned } = req.body;
  const { isUser } = req.user;

  if (!title && !content) {
    return res
      .status(400)
      .json({ error: true, message: "No changes provided :(" });
  }

  try {
    const note = await Note.findOne({ _id: noteId, userId: isUser._id });
    if (!note)
      return res
        .status(404)
        .json({ error: true, message: "Note not found :(" });

    if (title) note.title = title;
    if (content) note.content = content;
    if (isPinned) note.isPinned = isPinned;

    await note.save();
    return res.json({
      error: false,
      note,
      message: "Note updated successfully :)",
    });
  } catch (exception) {
    console.log(exception);
    return res.status(500).json({error: true, message: "Internal Server Error :("});    
  }
}

async function getAllNotes(req, res) {
    const {isUser} = req.user;
    try {
        const notes = await Note.find({userId: isUser._id}).sort({isPinned: -1});
        return res.json({
            error: false,
            notes,
            message: "All notes retrieved successfully :)"
        })
    } catch (exception) {
        return res.status(500).json({
            error: true,
            message: "Internal Server Error :("
        })
    }
    
}

async function getNoteById (req, res) {
    const {isUser} = req.user;
    const noteId = req.params.noteId;
    try {
        const note = await Note.findOne({_id: noteId, userId: isUser._id})
        if (!note) {
            return res.status(404).json({error: true, message: "Note not found :("});    
        }
        return res.json({error: false, note, message: "Note retrieved successfully :)"})
    } catch (exception) {
        console.log(exception);
        return res.status(500).json({error: true, message: "Internal Server Error :("});
    }
}

async function deleteNote (req, res) {
    console.log("entered deleteNote...");
    const {isUser} = req.user;
    const noteId = req.params.noteId;

    try {
        const note = await Note.findOne({_id: noteId, userId: isUser._id});
        if (!note) {
            return res.status(404).json({error: true, message: "Note not found :("});
        }

        await note.deleteOne();
        return res
            .status(200)
            .json({ error: false, message: "Note deleted successfully :)" });
        
    } catch (Exception) {
        console.log(Exception);
        return res.status(500).json({error: true, message: "Internal Server Error :("});
    }
}

async function searchNotes (req, res) {
    const {isUser} = req.user;
    const { query } = req.query;

    console.log(query);

    if (!query) {
        return res.status(400).json({error: true, message: "Search query is required :("});
    }

    try {
        const notes = await Note.find({
            userId: isUser._id,
            $or: [
                {title: {$regex: new RegExp(query, "i")}},
                {content: {$regex: new RegExp(query, "i")}}
            ],
        })

        return res.json({error: false, notes, message: "Notes retrieved successfully :)"});
    } catch (exception) {
        console.log(exception);
        return res.status(500).json({error: true, message: "Internal Server Error :("});
    }
}

async function pinNote(req, res) {
  const {isUser} = req.user;
  const noteId = req.params.noteId;

  try {
    const note = await Note.findOne({_id: noteId, userId: isUser._id});
    if (!note) {
      return res.status(404).json({error: true, message: "Note not found :("});
    }

    note.isPinned = !note.isPinned;
    await note.save();
    return res.json({
      error: false, 
      note,
      message: note.isPinned ? "Note pinned successfully :)" : "Note unpinned successfully :)"
    })
  } catch (error) {
    console.log(error);
    return res.status(500).json({error: true, message: "Internal Server Error :("});
  }
}

module.exports = { addNote, editNote, getAllNotes, getNoteById, deleteNote, searchNotes, pinNote };