export const isLoggedIn = (req, res, next) => {
  if (req.user) {
    return next()
  }
  res.status(401).send({ message: 'Not authorized' })
}
