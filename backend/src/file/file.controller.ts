import { Body, Controller, Get, Param, Post, Req, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { FirebaseAuthGuard } from 'src/auth/guards/firebase-auth.guard';
import { UserService } from 'src/user/user.service';
import { createFile } from './dto/create-file.dto';
import { FileService } from './file.service';

@Controller('file')
export class FileController {
    constructor(
      private readonly fileService: FileService,
      ) {}
    
    @Post('Upload')
    @UseGuards(FirebaseAuthGuard)
    @UseInterceptors(FileInterceptor('file',
    {storage: diskStorage({
        destination: `./uploads`,
        filename: (req, file, cb) => {
          return cb(
            null,
            `${new Date().toISOString().replace(/:/g, '-')}${extname(file.originalname)}`
          );
        }
      })
    }))
    async uploadFile(@UploadedFile() file, @Req() req, @Body() dto: createFile){
        return await this.fileService.createFile(file, dto, req);
    }

    @Get(':fileName')
    async serveFile(@Param('fileName') fileName: string, @Res() res) {
    return await this.fileService.serveStatic(fileName, res);
  }
}
