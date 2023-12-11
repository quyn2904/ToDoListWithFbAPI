import { MongoClient, Db, Collection } from 'mongodb'
import Iconnection from './type.connection'

class MongodbDatabase implements Iconnection {
  public connectName: string
  host: string
  port: number
  private connectString: string
  private client: MongoClient
  public db: Db

  private static instance: MongodbDatabase

  private constructor() {
    this.host = ''
    this.port = 0
    this.connectString = `mongodb+srv://${process.env.DB_USERNAME_MONGO}:${process.env.DB_PASSWORD_MONGO}@piedteamwebappcluster0.6gx9e20.mongodb.net/?retryWrites=true&w=majority`
    this.connectName = 'MongoDB Atlas'
    this.client = new MongoClient(this.connectString)
    this.db = this.client.db(`${process.env.DB_NAME}`)
  }

  public static getInstance(): MongodbDatabase {
    if (!MongodbDatabase.instance) {
      MongodbDatabase.instance = new MongodbDatabase()
    }

    return MongodbDatabase.instance
  }

  public async connect(): Promise<void> {
    try {
      await this.db.command({ ping: 1 })
      console.log('Pinged your deployment. You successfully connected to MongoDB!')
    } catch (error) {
      console.log(error)
      throw new Error('Unable to connect to MongoDB Atlas Database.')
    }
  }
}

export default MongodbDatabase
