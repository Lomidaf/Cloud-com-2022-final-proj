import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationController } from './notification.controller';
import { NotificationService } from './notification.service';
import { Notice } from 'src/notification/entities/notification.entity';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Notice]), UserModule],
  controllers: [NotificationController],
  providers: [NotificationService],
  exports: [NotificationService,]
})
export class NotificationModule {}
