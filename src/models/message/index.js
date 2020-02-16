import mongoose from 'mongoose'

const MessageSchema = new mongoose.Schema({
  timestamp: {
    type: Date,
    required: true,
    default: Date.now()
  },
  message: {
    type: String,
    required: true
  },
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  location: {
    type: String,
    required: true
  },
  image: {
    type: String
  }
})

const Message = mongoose.model('Message', MessageSchema)

export default Message
