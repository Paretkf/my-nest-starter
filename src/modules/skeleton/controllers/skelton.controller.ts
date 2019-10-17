import { Controller, Post, Body, Get, Param, UseGuards } from '@nestjs/common'

@Controller('skeleton')
export class SkeletonController {
  constructor(
    // private readonly someService: SomeService
  ) {}


  @Get('')
  getAll(): any {
    return {
      data: 'test'
    }
  }
}
