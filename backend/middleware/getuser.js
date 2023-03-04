const jwt = require('jsonwebtoken');
const JWT_SECRET_KEY = 'AKASHNISHAD_IS_A_GOOD_CODER';

const getUser = (req, res, next) => {
    const token = req.header('token');
    if(!token){
        res.status(401).send({errors: 'Please authenticate user'});
    }

    try{
        const data = jwt.verify(token, JWT_SECRET_KEY);
        req.user = data.user;
        next();
    }catch(error){
        console.error(error.message);
        res.status(401).send({errors: 'Please authenticate user'});
    }
    
};

module.exports = getUser;