import express from 'express'
import passport from 'passport'

import { createUser } from '@controllers/user'
import { createMessage, getMessagesForReceiversByLocation, getSenderMessages } from '@controllers/message'
import {
  createIssue,
  findIssuesByRequesterCountry,
  findIssuesByUser,
  updateIssue
} from '@controllers/issue'
import { isLoggedIn } from './src/middleware'
import { setup } from './setup'


const PORT = process.env.PORT || 3000

const app = express()
setup(app)

app.get('/', (req, res) => {
  res.send('nyancat')
})

// User routes
app.post('/create_user', createUser)
app.post('/login', passport.authenticate('local'),
  (req, res) => {
    res.send(req.user)
  })

// Message Routes
app.post('/send_message', isLoggedIn, createMessage)
app.get('/find_messages', isLoggedIn, getMessagesForReceiversByLocation)
app.get('/find_sender_messages', isLoggedIn, getSenderMessages)

// Issue Routes
app.post('/send_issue', isLoggedIn, createIssue)
app.patch('/update_issue', isLoggedIn, updateIssue)
app.get('/find_issues_by_country', isLoggedIn, findIssuesByRequesterCountry)
app.get('/find_issues_by_user', isLoggedIn, findIssuesByUser)

app.listen(PORT, () => {
  console.log('Connecting to the DB...')
  console.log(`Listening on port ${PORT}...`)
})
