import { Catch, HttpException } from '@nestjs/common'
import { ErrorFilter } from './error.filter'

@Catch(HttpException)
export class HttpExceptionFilter extends ErrorFilter {
  protected prepare(exception) {
    this.message = exception.message.message || exception.message.error
    this.code = exception.getStatus()
  }
}
