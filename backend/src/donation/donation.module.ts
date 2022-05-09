import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';
import { DonationController } from './donation.controller';
import { DonationService } from './donation.service';
import { Donation } from './entities/donation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Donation]), UserModule, ConfigModule],
  controllers: [DonationController],
  providers: [DonationService]
})
export class DonationModule {}
