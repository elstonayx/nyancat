import mongoose from 'mongoose'
import MessageSchema from '@models/message'
import { categoryList, countryList } from './constants'

export const IssueSchema = mongoose.Schema({
  topic: {
    type: String,
    required: true
  },
  tags: {
    type: Array
  },
  country: {
    type: String,
    enum: countryList,
    required: true
  },
  category: {
    type: String,
    enum: categoryList,
    required: true
  },
  requester: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  details: {
    type: String,
    required: true
  },
  messages: {
    type: [MessageSchema]
  },
  responder: {
    type: mongoose.Schema.Types.ObjectId
  }

})

export const Issue = mongoose.model('Issue', IssueSchema)
