import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { UserModule } from 'src/user/user.module';
import { FileItem } from './entities/fileItem.entity';
import { FileController } from './file.controller';
import { FileService } from './file.service';

@Module({
  imports: [TypeOrmModule.forFeature([FileItem]), UserModule],
  controllers: [FileController],
  providers: [FileService],
  exports: [FileService]
})
export class FileModule {}
