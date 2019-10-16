import { Controller, Post, Body, Get, Param, UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from '../../../auth/guards/jwt-auth.guard'

@Controller('skeleton')
export class SkeletonController {
  constructor(
    // private readonly authLogic: AuthLogic
  ) {}


  @Get('')
  @UseGuards(JwtAuthGuard)
  getAll(): any {
    return {
      daTa: 'test'
    }
  }
}
