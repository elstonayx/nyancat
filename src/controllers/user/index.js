import User from '@models/user'

export const createUser = (req, res) => {
  console.log(req.body)
  const user = new User({
    username: req.body.username,
    password: req.body.password
  })

  user.save().then(() => {
    res.send(user)
  }).catch(() => {
    res.send('Bad data.')
  })
}
