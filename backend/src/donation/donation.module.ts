import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FundraiserModule } from 'src/fundraiser/fundraiser.module';
import { NotificationModule } from 'src/notification/notification.module';
import { UserModule } from 'src/user/user.module';
import { DonationController } from './donation.controller';
import { DonationService } from './donation.service';
import { Donation } from './entities/donation.entity';
import { SlipVision } from './slip-vision';

@Module({
  imports: [TypeOrmModule.forFeature([Donation]), UserModule, ConfigModule, FundraiserModule, NotificationModule],
  controllers: [DonationController],
  providers: [DonationService, SlipVision]
})
export class DonationModule {}
