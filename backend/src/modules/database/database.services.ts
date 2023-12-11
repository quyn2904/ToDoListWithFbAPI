import User from '../user/user.schema'
import MongodbDatabase from './database.mongo'
import { Collection } from 'mongodb'
import dotenv from 'dotenv'
dotenv.config()

const MongoDBIntance = MongodbDatabase.getInstance()
class DatabaseServices {
  get users(): Collection<User> {
    return MongoDBIntance.db.collection(process.env.DB_USERS_COLLECTION as string)
  }
}

const databaseServices = new DatabaseServices()
export default databaseServices
