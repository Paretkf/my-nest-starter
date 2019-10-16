import { Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthLogic {
  constructor (
    private readonly authService: AuthService
  ) {}

  async validateUser(userData) {
    // TODO Change get user from db
    const mockUser = [
      {
        name: 'rachata',
        email: 'rachata@sellsuki.com',
        password: '1234'
      },
      {
        name: 'fluk',
        email: 'fluk@sellsuki.com',
        password: '1234'
      }
    ]
    const userIndex = mockUser.findIndex(user => user.email === userData.email && user.password === userData.password)
    if (userIndex !== -1) {
      return this.authService.createToken(mockUser[userIndex])
    } else {
      throw new UnauthorizedException
    }
  }
}