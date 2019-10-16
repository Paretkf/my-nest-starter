// import { AppConfig } from './../config/app-config'
import * as mongoose from 'mongoose'
import { Injectable } from '@nestjs/common'
import { MongooseOptionsFactory, MongooseModuleOptions } from '@nestjs/mongoose'

@Injectable()
export class MongooseOption implements MongooseOptionsFactory {
  // constructor(private config: AppConfig) {}

  createMongooseOptions(): MongooseModuleOptions {
    mongoose.set('debug', true)
    mongoose.set('useFindAndModify', false)
    mongoose.set('toObject', {
      transform(doc: any, { _id, __v, id, ...filter }: any, options: any) {
        const filterId = _id || id

        if (!filterId) {
          return filter
        }

        filter.id = typeof filterId === 'object'
          ? String(filterId)
          : filterId

        return filter
      }
    })

    return {
      uri: `mongodb+srv://admin:1234@camp-service-stg-fmucb.mongodb.net/test?retryWrites=true&w=majority`,
      useNewUrlParser: true
    }
  }
}
