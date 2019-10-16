import { Injectable, UnauthorizedException, NotFoundException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { AuthService } from './auth.service'
import { JwtPayload } from './models/jwt.interface'
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'skeleton-auth') {
  private readonly routeMapping: object

  constructor(
    private readonly authService: AuthService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'hello nest.js',
      passReqToCallback: true
    })
  }

  async validate({ params }, payload: JwtPayload) {
    await this.assignRouteParams(params)
    console.log('JWT-STATEGY: validate...', params)
    return payload
  }

  protected async assignRouteParams(params: object): Promise<void> {
    const paramsKeys = Object.keys(params)
    const filterKeys = paramsKeys.filter(key => this.routeMapping.hasOwnProperty(key))

    const mappingPromises = filterKeys.map(key => this.routeMapping[key].resolveByUrl(params))
    const promiseResults = await Promise.all(mappingPromises)

    if (promiseResults.some(doc => !doc)) {
      throw new NotFoundException()
    }

    filterKeys.forEach((key, index) => {
      params[key] = promiseResults[index]
    })
  }
}
