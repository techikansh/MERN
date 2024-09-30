const express = require ("express");    
const {register, login, getUser} = require ("../controllers/authController");
const {authenticateToken} = require("../utlities");

const router = express.Router();

router.post("/create-user", register);
router.post("/login", login);
router.get("/get-user", authenticateToken, getUser);

module.exports = router;