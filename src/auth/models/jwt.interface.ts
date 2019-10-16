// TODO Change this.

export interface JwtPayload {
  email: string
  password: string
}

export interface JwtSignInformation {
  accessToken: string,
  expiresIn: any
}
