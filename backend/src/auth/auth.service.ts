import { Injectable,UnauthorizedException,
    HttpException,HttpStatus } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import {compare} from 'bcrypt'


@Injectable()
export class AuthService {
  constructor(private userService: UserService,private jwtService: JwtService) {}

  async signIn(username: string, pass: string): 
  Promise<{ access_token: string }> {
    const user = await this.userService.viewUserByName(username);
    if (!user){
        throw new HttpException(
            'Email not found.',
            HttpStatus.NOT_FOUND
        )
    }
    const comparison = await compare(pass, user.password);
    if (comparison=== false) {
      throw new UnauthorizedException('Wrong password.');
    }
    const payload = { 
        sub: user.id,
        userId: user.id
    };
    return {
        access_token: await this.jwtService.signAsync(payload)
    };
  }
}
