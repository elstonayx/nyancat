import express from 'express'
import bodyParser from 'body-parser'
import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import session from 'express-session'

import { createUser } from '@controllers/user'
import { createMessage, getMessagesForReceiversByLocation } from '@controllers/message'
import { connectDb } from '@models'
import User from '@models/user'
import { isLoggedIn } from './src/middleware'


const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(session({
  secret: 'SECRET',
  saveUninitialized: true,
  resave: true
}))
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

app.post('/create_user', createUser)

app.post('/login', passport.authenticate('local'),
  (req, res) => {
    res.send(req.user)
  })

app.get('/login_success', (req, res) => {
  res.status(200).send({ message: 'Successful Login.' })
})


app.get('/secret', isLoggedIn, (req, res) => {
  res.send({ message: 'Secret' })
})

app.post('/send_message', isLoggedIn, createMessage)

app.get('/find_messages', isLoggedIn, getMessagesForReceiversByLocation)

app.listen(process.env.PORT, () => {
  console.log('Connecting to the DB...')
  console.log(`Listening on port ${process.env.PORT}...`)
})
