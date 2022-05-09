import { Injectable, NotImplementedException, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import admin from 'firebase-admin';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        ) {}

    async getUserFromToken(token): Promise<any> {
      const user = await admin
        .auth()
        .verifyIdToken(token)
        .catch((error) => {
          console.log(error);
          throw new UnauthorizedException('Token is not valid');
        });
      return user;
    }
}
