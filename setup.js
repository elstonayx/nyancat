import bodyParser from 'body-parser'
import session from 'express-session'
import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import { connectDb } from '@models'
import User from '@models/user'

export const setup = (app) => {
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
}
