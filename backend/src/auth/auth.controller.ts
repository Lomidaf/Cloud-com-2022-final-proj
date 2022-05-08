import { Body, Controller, Get, NotImplementedException, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { FirebaseAuthGuard } from './guards/firebase-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('register')
    @UseGuards(FirebaseAuthGuard)
    async register(
    @Req() request,
    ) {
      const user = request.user;
      return user;
    }

}
