import Issue from '@models/issue'

export const createIssue = (req, res) => {
  const issue = new Issue({
    topic: req.body.topic,
    tags: req.body.tags,
    country: req.body.country,
    category: req.body.category,
    requester: req.body.user
  })

  issue
    .save()
    .then(() => {
      res.send(message)
    })
    .catch((err) => {
      res.status(400).send({ error: err })
    })
}

export const findIssuesByCountry = (req, res) => {
  Issue
    .find({
      country: req.params.country
    })
    .exec((err, issues) => {
      if (err) {
        res.send(err)
      }
      res.send(issues)
    })
}

export const findIssuesByUser = (req, res) => {
  Issue
    .find({
      requester: req.user
    })
    .exec((err, issues) => {
      if (err) {
        res.send(err)
      }
      res.send(issues)
    })
}
