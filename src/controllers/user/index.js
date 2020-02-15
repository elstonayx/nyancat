import User from '@models/user'

export const createUser = (req, res) => {
  const user = new User({
    username: req.body.username,
    password: req.body.password
  })

  user.save().then(() => {
    res.send(user)
  }).catch((err) => {
    res.status(400).send({ error: err })
  })
}
