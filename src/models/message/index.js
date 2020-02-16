import mongoose from 'mongoose'

export const MessageSchema = new mongoose.Schema({
  timestamp: {
    type: Date,
    required: true,
    default: Date.now()
  },
  content: {
    type: String,
    required: true
  },
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  image: {
    type: String
  }
})

export const Message = mongoose.model('Message', MessageSchema)
