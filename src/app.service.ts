import { Injectable } from '@nestjs/common'

@Injectable()
export class AppService {
  getHello(): any {
    return {
      message: 'This is my starter Nest.js project.',
      status: 200,
      date: new Date()
    }
  }
}
