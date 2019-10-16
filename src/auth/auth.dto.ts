import { IsString } from 'class-validator'

export class AuthUserLoginDto {
  @IsString()
  readonly email: string

  @IsString()
  readonly password: string
}
