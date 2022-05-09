import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { FirebaseAuthGuard } from 'src/auth/guards/firebase-auth.guard';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(
        private userService: UserService,
    ) {}

    @Post('register')
    @UseGuards(FirebaseAuthGuard)
    async register(
    @Req() request,
    ) {
      const user = await this.userService.create(request.user.uid);
      return user;
    }

    @Get('notification')
    @UseGuards(FirebaseAuthGuard)
    async getNotice(
    @Req() request,
    ) {
      const notice = await this.userService.getNotice(request.user.uid);
      return notice;
    }
}
