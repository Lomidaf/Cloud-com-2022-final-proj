import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { FirebaseAuthGuard } from 'src/auth/guards/firebase-auth.guard';
import { RegisterDto } from './dto/register.dto';
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
    @Body() body: RegisterDto
    ) {
      const user = await this.userService.create(request.user.uid, body);
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

    @Get('fundraiser')
    @UseGuards(FirebaseAuthGuard)
    async getFundraiser(
    @Req() request,
    ) {
      const fundraisers = await this.userService.getFundraiser(request.user.uid);
      return fundraisers;
    }
}
