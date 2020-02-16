import mongoose from 'mongoose'

const IssueSchema = mongoose.Schema({
  topic: {
    type: String,
    required: true
  },
  tags: {
    type: Array
  },
  country: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  requester: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  details: {
    type: String,
    required: true
  }
})

const Issue = IssueSchema.model('Issue', IssueSchema)

export default Issue
