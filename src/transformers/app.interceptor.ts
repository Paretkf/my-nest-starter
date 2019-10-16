import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor
} from '@nestjs/common'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { MongooseTransformers } from './mongoose.transformer'
import { isArray } from 'util'

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  constructor(
    private readonly mongooseTransformers: MongooseTransformers
  ) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map(data => {
        let response: any
        const req = context.switchToHttp().getRequest()

        if (data && data.docs) {
          response = this.mongooseTransformers.paginationTransformer(data)
        } else if (data && data._id) {
          response = this.mongooseTransformers.documentTransformer(data)
        } else if (data && isArray(data) ) {
          response = this.mongooseTransformers.arrayTransformer(data)
        } else if (data && data.accessToken) {
          response = this.mongooseTransformers.tokenTransformer(data)
        } else {
          response = this.mongooseTransformers.defaultTransformer(data)
        }

        req.res.header('X-Build-Number', process.env.BUILDNUMBER)

        return response
      })
    )
  }
}
