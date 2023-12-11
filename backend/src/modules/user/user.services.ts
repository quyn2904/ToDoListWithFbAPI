import databaseServices from '../database/database.services'
import User from './user.schema'
import { ObjectId } from 'mongodb'

class UserServices {
  async createUser(fullname: string) {
    const user_id = new ObjectId()
    const result = await databaseServices.users.insertOne(
      new User({
        _id: user_id,
        fullname,
        username: `pied_${user_id}`,
        password: Math.random().toString(36).slice(-10)
      })
    )
    return result
  }
}

const userServices = new UserServices()
export default userServices
