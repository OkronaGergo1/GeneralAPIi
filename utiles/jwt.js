var jwt = require('jsonwebtoken');
const { error } = require('winston');

console.log(generateToken({user: token}))

function generateToken(payload){

    const signOption={
        expiresIn: process.env.JWT_EXPIRES_IN
    }
    return jwt.sign(payload, process.env.JWT_SECRET, signOption);
}

function verifyToken(token){
    return jwt.verify(token, process.env.JWT_SECRET);
}

function tokencheck (req, res, next){
    const authHeader = req.headers['authorization']; //Bearer *token*
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.status(401).json({error: 'Access denied. No token provided'});

    try{
        const decoded = verifyToken(token);
        req.user = decoded;
        next();
    }
    catch (error){
        return res.status(400).json({error: 'Invalid or expired token.'})
    }
}
module.exports = {
    generateToken,
    verifyToken,
    tokencheck
}
