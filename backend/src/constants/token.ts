import { JwtPayload } from 'jsonwebtoken'
import { TokenType, UserVerifyStatus } from '../modules/user/user.enum'

export interface TokenPayload extends JwtPayload {
  user_id: string
  token_type: TokenType
  verify: UserVerifyStatus
  exp: number
  iat: number
}
