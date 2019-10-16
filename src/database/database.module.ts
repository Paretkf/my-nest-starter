import { MongooseOption } from './mongoose.option'
import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { CounterSchema } from './counter.schema'

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useClass: MongooseOption
    }),
    MongooseModule.forFeature([
      { name: 'Counter', schema: CounterSchema }
    ])
  ],
  providers: [],
  controllers: []
})

export class DatabaseModule {}
