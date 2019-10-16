import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { LoggerMiddleware } from './middleware/logger.middleware'
import { AuthModule } from './auth/auth.module'
import { APP_PIPE, APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core'
import { CamelizeKeysPipe } from './pipe/camelizeKeys.pipe'
import { ValidationPipe } from './pipe/validation.pipe'
import { ErrorFilter } from './exception/error.filter'
import { HttpExceptionFilter } from './exception/http-exception.filter'
import { SkeltonModule } from './modules/skeleton/skelton.module'
import { TransformInterceptor } from './transformers/app.interceptor'
import { MongooseTransformers } from './transformers/mongoose.transformer'
// import { DatabaseModule } from './database/database.module'

// TODO Add MongoDB
// TODO Add Intercepter
// TODO Add Guard

const AppProvider = [
  {
    provide: APP_FILTER,
    useClass: ErrorFilter
  },
  {
    provide: APP_FILTER,
    useClass: HttpExceptionFilter
  },
  {
    provide: APP_PIPE,
    useClass: CamelizeKeysPipe
  },
  {
    provide: APP_PIPE,
    useClass: ValidationPipe
  },
  {
    provide: APP_INTERCEPTOR,
    useClass: TransformInterceptor
  },
  MongooseTransformers

]


@Module({
  imports: [AuthModule, SkeltonModule],
  controllers: [AppController],
  providers: [AppService, ...AppProvider],
})
export class AppModule implements NestModule {
  // implement logger for all routes
  configure(consumer: MiddlewareConsumer) {
    consumer
    .apply(LoggerMiddleware)
    .forRoutes({ path: '*', method: RequestMethod.ALL })
  }
}
