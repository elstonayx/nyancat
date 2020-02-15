import mongoose from 'mongoose'

export const connectDb = () => mongoose.connect(process.env.DATABASE_URL)
