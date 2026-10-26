const jsonwebtoken = require('jsonwebtoken')

const generateAgentToken = (data, expiry) => {
    const token = jsonwebtoken.sign(
        {
            userId: data._id,
            email: data.email,
            name: data.name
        },
        process.env.SECRET,
        {
            expiresIn: "1d", // Expiry set to 5 seconds
        }
    )
    return token
}

const generateClientToken = (data) => {
    console.log("data", data)
    const token = jsonwebtoken.sign(
        {
            clientId: data._id,
            name: data.name,
            phone_number: data.phone_number,
            email: data.email,
            role: data.role
        },
        process.env.SECRET,

        { expiresIn: "1d" }
    )
    return token
}

const generateAgentTokenPublic = (data) => {
    const token = jsonwebtoken.sign(
        {
            agentId: data._id,
            role: data.role,
            email: data.email,
            name: data.name,
        },
        process.env.SECRET

    )
    return token
}

module.exports = { generateAgentToken, generateClientToken }
