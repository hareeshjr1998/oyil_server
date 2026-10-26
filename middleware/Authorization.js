const jsonwebtoken = require('jsonwebtoken')

const authorization = function (req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    //const token = req.params.token

    if (token == null) return res.sendStatus(401)
    try {
        let tokenResult = jsonwebtoken.verify(token, process.env.SECRET)
        //console.log('tokenResult', tokenResult)

        if (tokenResult) {
            req.email = tokenResult.email
            req._id = tokenResult._id
            req.role = tokenResult.role
            req.clientId = tokenResult.clientId;
            req.user_id = tokenResult.userId;


            next()
        } else {
            res.status(500).json({
                message: 'Something wrong',
            })
        }
    } catch (error) {
        return res.status(401).json({
            message: error.message,
        })
    }
}

module.exports = authorization
