const errorHandler = (err,req,res,next) =>{
    const statusCode = res.statusCode ? res.statusCode : 500
    res.status(statusCode)
    res.json({
        message:err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack
    })
}
const authMiddleware = (err,req,res,next) =>{
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.sendStatus(401); // if no token

    jwt.verify(token, 'jailbreaf', (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next(); // pass execution to the next middleware
    });

}
    module.exports = {
        errorHandler,
        authMiddleware
    }