import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './Local.strategy';
@Module({
  imports: [ClientsModule.register([{
    name: 'USER_CLIENT',
    transport: Transport.TCP,
    options: {
      host: 'localhost',
      port: 6100,
    }

  }]), JwtModule.register({
    secret: 'yoursecret',
    signOptions: {expiresIn: '60s'}
  })],
  controllers:[AuthController],
  providers: [AuthService, LocalStrategy]
})
export class AuthModule {}
