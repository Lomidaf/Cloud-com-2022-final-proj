import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import configuration from 'src/config/configuration';
import { ConnectionOptions } from 'typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FundraiserController } from './fundraiser/fundraiser.controller';
import { FundraiserModule } from './fundraiser/fundraiser.module';
import { FileController } from './file/file.controller';
import { FileModule } from './file/file.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { FirebaseAuthStrategy } from './auth/strategies/firebase-auth.strategy';
import { DonationModule } from './donation/donation.module';
import { NotificationModule } from './notification/notification.module';

@Module({
  imports: [
    FundraiserModule,
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        return configService.get<ConnectionOptions>('database');
      },
      inject: [ConfigService],
    }),
    FileModule,
    UserModule,
    AuthModule,
    DonationModule,
    NotificationModule,
  ],
  controllers: [AppController, FundraiserController, FileController],
  providers: [AppService, FirebaseAuthStrategy],
})
export class AppModule {}
