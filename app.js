import express from 'express'
import bodyParser from 'body-parser'
import { createUser } from '@controllers/user'

import { connectDb } from './src/models'

const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/user', createUser)

app.listen(process.env.PORT, () => {
  console.log('Connecting to the DB...')
  connectDb()
  console.log(`Listening on port ${process.env.PORT}...`)
})
