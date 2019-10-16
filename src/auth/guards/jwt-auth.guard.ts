import {
  ExecutionContext,
  Injectable,
  UnauthorizedException
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'

@Injectable()
export class JwtAuthGuard extends AuthGuard('skeleton-auth') {
  private static user: any = {
    id: null,
    email: ''
  }
  protected params: any
  canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest()
    console.log('GUARD : canActivate...')
    this.params = req.params
    return super.canActivate(context)
  }

  handleRequest(err, user, info) {
    console.log('GUARD : handleRequest...')
    if (err || !user) {
      throw err || new UnauthorizedException()
    }
    JwtAuthGuard.setAuthorizedUser(user)
    return user
  }

  public static getAuthorizedUser() {
    return JwtAuthGuard.user
  }

  public static setAuthorizedUser(user) {
    JwtAuthGuard.user = user
  }
}
