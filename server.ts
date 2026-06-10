import { app } from './src/app'
import { connectDatabase } from './database/mongo'
import dotenv from 'dotenv'

dotenv.config()

const PORT = process.env.PORT || 3000

async function startServer() {
  await connectDatabase()

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
  })
}

startServer()
