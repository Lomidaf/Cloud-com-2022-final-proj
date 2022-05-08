import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';
import { Fundraiser } from './entities/fundraiser.entity';
import { FundraiserService } from './fundraiser.service';

@Module({
  imports: [TypeOrmModule.forFeature([Fundraiser]), UserModule],
  providers: [FundraiserService],
  exports: [FundraiserService],
})
export class FundraiserModule {}
