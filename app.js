import express from 'express'
import bodyParser from 'body-parser'
import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'

import { createUser } from '@controllers/user'
import { connectDb } from '@models'
import User from '@models/user'

const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
connectDb()
app.use(passport.initialize())
app.use(passport.session())
passport.use(new LocalStrategy((((username, password, done) => {
  User.findOne({ username }, (err, user) => {
    if (err) { return done(err) }
    if (!user) {
      return done(null, false, { message: 'Incorrect username.' })
    }
    user.comparePassword(password, (_, isMatch) => (
      isMatch
        ? done(null, user)
        : done(null, false, { message: 'Incorrect password.', error: err })
    ))
  })
}))))
passport.serializeUser((user, done) => {
  done(null, user.id)
})
passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user)
  })
})


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/user', createUser)

app.post('/login', passport.authenticate('local', {
  failureRedirect: '/'
}), (req, res) => {
  res.redirect('/login_success')
})

app.get('/login_success', passport.authenticate('local'), (req, res) => {
  res.status(200).send({ message: 'Successful Login.' })
})

app.listen(process.env.PORT, () => {
  console.log('Connecting to the DB...')
  console.log(`Listening on port ${process.env.PORT}...`)
})
