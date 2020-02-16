import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import passportLocalMongoose from 'passport-local-mongoose'

const SALT_WORK_FACTOR = 10

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  }
})

UserSchema.pre('save', function (next) {
  const user = this

  if (!user.isModified('password')) {
    return next()
  }


  bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
    if (err) {
      return next(err)
    }

    bcrypt.hash(user.password, salt, (err2, hash) => {
      if (err2) {
        return next(err2)
      }

      user.password = hash
      next()
    })
  })
})

UserSchema.methods.comparePassword = function (candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) {
      return cb(err)
    }
    return cb(null, isMatch)
  })
}

UserSchema.plugin(passportLocalMongoose)

export const User = mongoose.model('User', UserSchema)
