import { Inject, Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ClientProxy } from '@nestjs/microservices';
import { compareSync } from 'bcrypt';
import { lastValueFrom, timeout } from 'rxjs';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject('USER_CLIENT')
    private readonly client:ClientProxy,
    private readonly jwtService:JwtService
  ){}

  async validateUser(username: string, password: string): Promise<any>{
    try {
      const user$ = await this.client.send({role:'user', cmd: 'get'}, {username});
      const user = await lastValueFrom(user$)

      if(password=== user?.password){
        return user;
      }

      return null;
      
    } catch (error) {
      Logger.log(error);
      throw error;
      
    }
  }

  async login(user){
    const payload = {user, sub: user.id};

    return{
      userId: user.id,
      accessToken: this.jwtService.sign(payload)
    };
  }

  validateToken(jwt: string){
    return this.jwtService.verify(jwt);
  }
  
  
}
