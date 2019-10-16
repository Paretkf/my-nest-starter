import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { AuthLogic } from "./auth.logic";
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from "./jwt-stategy";

@Module({
  imports: [
    // TODO Change to ENV
    JwtModule.register({
      privateKey: 'hello nest.js',
      signOptions: {
        expiresIn: 30000
      }
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthLogic, JwtStrategy]
})

export class AuthModule {}
