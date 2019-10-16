import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtPayload, JwtSignInformation } from './models/jwt.interface'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
  ) {}

  async createToken(userLoginData: JwtPayload): Promise<JwtSignInformation> {
    const user: JwtPayload = userLoginData
    const accessToken = this.jwtService.sign(user)
    // TODO Change expiresIn to env
    return {
      expiresIn: 300000,
      accessToken
    }
  }

  async validateClient(token: string): Promise<any> {
      const userData = this.jwtService.decode(token)
      return userData
  }
}
