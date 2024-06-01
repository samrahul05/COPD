const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
  
    if (!authHeader) {
        return res.status(401).json({ message: 'Authentication required' });
    }

    const token = authHeader.split(' ')[1]; // Extracting the token part after 'Bearer'
  
    jwt.verify(token, process.env.SECRETKEY, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Failed to authenticate token' });
        }
        req.User = decoded; // Store decoded user information in request object
        console.log("verifytoken",req.User);
        next();
    });
};

module.exports = verifyToken;
