import { HttpStatus } from '@nestjs/common'
export class ErrorResponse {
  public static render(context, message, code) {
    const response = context.getResponse()
    const request = context.getRequest()

    response
      .status(code)
      .header('X-Build-Number', process.env.BUILDNUMBER)
      .json({
        code,
        message,
        method: request.method,
        path: request.url
      })
  }
}
