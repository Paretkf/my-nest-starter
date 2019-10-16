import { Controller, Post, Body, Get, Param } from '@nestjs/common'
import { AuthUserLoginDto } from './auth.dto'
import { AuthLogic } from './auth.logic'

@Controller('')
export class AuthController {
  constructor(
    private readonly authLogic: AuthLogic
  ) {}
  @Post('auth/login')
  async createToken(@Body() userData: AuthUserLoginDto): Promise<any> {
    return this.authLogic.validateUser(userData)
  }
}