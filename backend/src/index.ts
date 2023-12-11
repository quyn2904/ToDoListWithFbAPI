import express from 'express'
import dotenv from 'dotenv'
import { defaultErrorHandler } from './modules/errror/error.middlewares'
import { createServer } from 'http'
import cors from 'cors'
import Database from './modules/database/database.connection'
import MongodbDatabase from './modules/database/database.mongo'
import userRouter from './modules/user/user.routers'

dotenv.config()
const corsOptions = {
  origin: 'http://localhost:3000', //frontend
  credentials: true,
  allowedHeaders: 'Content-Type,Authorization',
  optionsSuccessStatus: 200
}

const app = express()
const httpServer = createServer(app)
const port = process.env.PORT || 4000
app.use(cors(corsOptions))

//app handler
app.use(express.json()) //app handler
app.use('/users', userRouter)
//default double
app.get('/', (req, res) => {
  res.send('hello world')
})

//database
const database = Database.getInstance()
database.connect(MongodbDatabase.getInstance())

app.use(defaultErrorHandler)

httpServer.listen(port, () => {
  console.log(`server này đang chạy trên post ${port}`)
})
