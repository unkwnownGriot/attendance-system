const jwt = require('jsonwebtoken')


function generateToken(user){
    return jwt.sign({
        userId : user.id,
        onWork : user.onWork,
        role : user.role
    }, process.env.JWT_SIGN_SECRET_KEY,{
        expiresIn:'2min'
    })
}


module.exports = generateToken