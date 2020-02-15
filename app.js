import express from 'express'
import passport from 'passport'

import { createUser } from '@controllers/user'
import { createMessage, getMessagesForReceiversByLocation, getSenderMessages } from '@controllers/message'
import { isLoggedIn } from './src/middleware'
import { setup } from './setup'


const PORT = process.env.PORT || 3000

const app = express()
setup(app)

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

app.get('/find_sender_messages', isLoggedIn, getSenderMessages)

app.listen(PORT, () => {
  console.log('Connecting to the DB...')
  console.log(`Listening on port ${PORT}...`)
})
