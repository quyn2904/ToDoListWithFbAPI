import { ObjectId } from 'mongodb'
import { UserVerifyStatus } from '../user/user.enum'

//đặt interface vì theo chuẩn ts thôi, chứ làm thực tế thì khác
interface UserType {
  _id?: ObjectId
  fullname: string
  email?: string
  username: string
  password: string
  phone_number?: string
  date_of_birth?: Date
  created_at?: Date
  updated_at?: Date //lúc mới tạo chưa có gì thì nên cho bằng create_at
  email_verify_token?: string // jwt hoặc '' nếu đã xác thực email
  forgot_password_token?: string // jwt hoặc '' nếu đã xác thực email
  verify?: UserVerifyStatus

  bio?: string // optional
  avatar?: string // optional
  facebook_url?: string // optional
}

export default class User {
  _id?: ObjectId
  fullname: string
  email: string
  username: string
  password: string
  phone_number: string
  date_of_birth: Date
  created_at?: Date
  updated_at?: Date //lúc mới tạo chưa có gì thì nên cho bằng create_at
  email_verify_token?: string // jwt hoặc '' nếu đã xác thực email
  forgot_password_token?: string // jwt hoặc '' nếu đã xác thực email
  verify?: UserVerifyStatus

  bio?: string // optional
  avatar?: string // optional
  facebook_url?: string // optional

  constructor(user: UserType) {
    const date = new Date() //tạo này cho ngày created_at updated_at bằng nhau
    this._id = user._id || new ObjectId() // tự tạo id
    this.fullname = user.fullname || '' // nếu người dùng tạo mà k truyền ta sẽ để rỗng
    this.email = user.email || ''
    this.username = user.username || ''
    this.password = user.password
    this.phone_number = user.phone_number || ''

    this.date_of_birth = user.date_of_birth || new Date()
    this.created_at = user.created_at || date
    this.updated_at = user.updated_at || date
    this.email_verify_token = user.email_verify_token || ''
    this.forgot_password_token = user.forgot_password_token || ''
    this.verify = user.verify || UserVerifyStatus.Unverified

    this.bio = user.bio || ''
    this.avatar = user.avatar || ''
    this.facebook_url = user.facebook_url || ''
  }
}
