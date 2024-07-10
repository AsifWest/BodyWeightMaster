const User = require('../Modles/userModel');
const jwt = require('jsonwebtoken')

const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '7d' })
}

// Login user
const loginUser = async (req, res) => {

    const { email, password } = req.body

    try {
        const user = await User.login(email, password)

        //create a toke
        const token = createToken(user._id)

        res.status(200).json({ email, token })


    } catch (error) {
        res.status(400).json({ error: error.message })
    }

    // res.json({ mssg: 'login user' });
}

// Signup user
const signupUser = async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await User.signup(email, password)

        //create a toke
        const token = createToken(user._id)

        res.status(200).json({ email, token })


    } catch (error) {
        res.status(400).json({ error: error.message })
    }

    //res.json({ mssg: 'signup user' });
}

module.exports = { signupUser, loginUser };
