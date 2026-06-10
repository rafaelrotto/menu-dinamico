import mongoose from 'mongoose'

export async function connectDatabase() {
  await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/menu')

  console.log('MongoDB connected')
}
