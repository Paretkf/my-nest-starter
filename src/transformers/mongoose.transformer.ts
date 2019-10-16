import { Injectable } from '@nestjs/common'
import * as humps from 'humps'

@Injectable()
export class MongooseTransformers {
  paginationTransformer(data: any): object {
    data.docs.forEach((doc, index) => {
      data.docs[index] = doc.toObject()
    })
    const response = {
      message: 'done',
      ...data,
      data: humps.decamelizeKeys(data.docs)
    }
    delete response.docs

    return response
  }

  documentTransformer(data: any): object {
    const response = {
      message: 'done',
      data: humps.decamelizeKeys(data.toObject())
    }

    return response
  }

  arrayTransformer(data: any): object {
    data.forEach((doc, index) => {
      data[index] = doc._id ? doc.toObject() : doc
    })
    const response = {
      message: 'done',
      data: humps.decamelizeKeys(data)
    }

    return response
  }

  tokenTransformer(data: any): object {
    const { expiresIn, accessToken, ...information } = data
    const response = {
      message: 'done',
      data: information,
      expiresIn,
      accessToken
    }

    return humps.decamelizeKeys(response)
  }

  defaultTransformer(data: any): object {
    const response = {
      message: 'done',
      data: humps.decamelizeKeys(data)
    }

    return response
  }
}
