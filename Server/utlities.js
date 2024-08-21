import jwt from "jsonwebtoken";

export function authenticateToken (req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) res.sendStatus(401);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) res.sendStatus(401);
        req.user = user;
        next();
    })
}

// line 5 explanation
// if authHeader is "Bearer abcdef123456", 
// authHeader.split(" ")[1] will be "abcdef123456"


