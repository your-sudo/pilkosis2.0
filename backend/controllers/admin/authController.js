import User from '../../models/user.js'
import bcrypt from 'bcryptjs'

export const register = async (req, res) => {

  const { nis, password } = req.body

  const hashed = await bcrypt.hash(password, 10)

  const user = await User.create({
    nis,
    password: hashed
  })

  res.json(user)
}