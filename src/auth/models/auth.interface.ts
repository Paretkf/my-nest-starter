import { Document } from 'mongoose'

export interface AuthInfomation extends Document {
  accessToken: string,
  expiresIn: number
  data: {
    id: number,
    firstName: string,
    lastName: string,
    status: string,
    displayLanguage: object,
    stores: object
  }
}