import Issue from '@models/issue'
import User from '@models/user'

export const createIssue = (req, res) => {
  const issue = new Issue({
    topic: req.body.topic,
    tags: req.body.tags,
    country: req.body.country,
    category: req.body.category,
    requester: req.user,
    details: req.body.details
  })

  issue
    .save()
    .then(() => {
      res.send(issue)
    })
    .catch((err) => {
      res.status(400).send({ error: err })
    })
}

export const findIssuesByRequesterCountry = async (req, res) => {
  const docs = await User.findById(req.user).select('location')

  await Issue
    .find({
      country: docs.location.toLower(),
      requester: { $ne: req.user }
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

export const updateIssue = (req, res) => {
  Issue
    .findByIdAndUpdate(
      req.query.id,
      {
        topic: req.body.topic,
        tags: req.body.tags,
        country: req.body.country,
        category: req.body.category,
        details: req.body.details
      },
      {
        omitUndefined: true,
        new: true
      },
      (err, issues) => {
        if (err) {
          res.send(err)
        }
        res.send(issues)
      }
    )
}
