const db = require('knex')(require('../../knexfile'))
require('dotenv').config();
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');
const jsonSecretKey = process.env.JSON_SECRET_KEY;


const signup = async (req, res) => {
  const { User, Username, Password } = req.body

  const hashedPassword = await bcrypt.hash(Password, 10);

  try {
    await db('users').insert({
      User,
      Username,
      Password: hashedPassword
    })
    res
      .status(201)
      .json({ success: true, message: 'User created successfully.' })
  } catch (err) {
    res
      .status(400)
      .json({ success: false, message: `Error creating user: ${err.message}` })
  }
}

const login = async (req, res) => {
  const { User, Password } = req.body

  console.log(req)
  try {
    const user = await db('users').where({ User }).first()
    if (user && await bcrypt.compare(Password, user.Password)) {
        const token = jwt.sign({ Username: user.Username, Role: user.Role }, jsonSecretKey, { expiresIn: '2h' });
      res.json({ success: true, token, username:user.Username ,role: user.Role})
    } else {
      res
        .status(403)
        .json({
          success: false,
          message: 'Invalid username/password combination.'
        })
    }
  } catch (err) {
    res
      .status(400)
      .json({ success: false, message: `Error logging in: ${err.message}` })
  }
}


const profile = async (req, res) => {

  try {
    const user = await db('users').where({ User: req.body.User }).first()
    
    if (user) {
  
      res.json({
        success: true,
        profile: { User: user.User, Username: user.Username }
      })
    } else {
      res.status(404).json({ success: false, message: 'User not found.' })
    }
  } catch (err) {
    res
      .status(400)
      .json({
        success: false,
        message: `Error retrieving user profile: ${err.message}`
      })
  }
}


//list users

const userList = async (req, res) => {
 
  try {
    const data = await db
      .select('users.*')
      .from('users')
    res.status(200).json(data)
  } catch (err) {
    res.status(400).send(`Error retrieving users: ${err}`)
  }
}
//



module.exports = {
  signup,
  login,
  profile,
  userList
}
