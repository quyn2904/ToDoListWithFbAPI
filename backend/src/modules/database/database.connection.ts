import Iconnection from './type.connection'

class Database {
  private static instance: Database

  private constructor() {}

  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database()
    }
    return Database.instance
  }

  public async connect(Iconnection: Iconnection) {
    try {
      Iconnection.connect()
    } catch (error: any) {
      console.log(error.message)
    }
  }
}

export default Database
