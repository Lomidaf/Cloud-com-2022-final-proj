import { Controller, Put, Req, UseGuards } from '@nestjs/common';
import { FirebaseAuthGuard } from 'src/auth/guards/firebase-auth.guard';
import { Notice } from './entities/notification.entity';
import { NotificationService } from './notification.service';

@Controller('notification')
export class NotificationController {
    constructor(
        private service: NotificationService,
    ){}

    @Put('read-all')
    @UseGuards(FirebaseAuthGuard)
    async readAll(
        @Req() req,
        ): Promise<Notice[]> {
        return await this.service.readAll(req.user.uid);
    }
}
