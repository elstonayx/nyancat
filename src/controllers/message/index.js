import { Message } from '@models/message'
import { Issue } from '../../models/issue'

export const createMessage = (req, res) => {
  const message = new Message({
    content: req.body.content,
    sender: req.user
  })

  message
    .save()
    .then(() => {
      Issue
        .findOneAndUpdate({ _id: req.body.issueId },
          { $push: { messages: message } },
          { new: true })
        .exec((err, issue) => {
          if (err) {
            res.send(err)
          }
          res.status(200).send(issue)
        })
    })
    .catch((err) => {
      res.status(400).send({ error: err })
    })
}

export const findRelatedMessages = (req, res) => {
  Issue
    .findById({ _id: req.query.issueId })
    .select('messages')
    .exec((err, messages) => {
      if (err) {
        res.send(err)
      }
      res.send(messages)
    })
}
