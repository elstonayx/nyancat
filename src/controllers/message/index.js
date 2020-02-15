import Message from '@models/message'

export const createMessage = (req, res) => {
  const message = new Message({
    message: req.body.message,
    sender: req.user,
    location: req.body.location
  })

  message.save().then(() => {
    res.send(message)
  }).catch((err) => {
    res.status(400).send({ error: err })
  })
}

export const getMessagesForReceiversByLocation = (req, res) => {
  Message
    .find({
      location: req.params.location
    })
    .populate('sender', 'location')
    .exec((err, messages) => {
      if (err) {
        res.send(err)
      }
      res.send(messages)
    })
}
