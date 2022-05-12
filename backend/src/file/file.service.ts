import { Injectable, Req, Res, UploadedFile } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { createFile } from './dto/create-file.dto';
import { FileItem } from './entities/fileItem.entity';

@Injectable()
export class FileService {
    constructor(
        @InjectRepository(FileItem) private readonly repositoryFileItem: Repository<FileItem>,
        private readonly userService: UserService,
    ){}

    async createFile(@UploadedFile() file, dto: createFile, @Req() req){
        const id = req.user.uid;
        const user = await this.userService.findOne(id);
        const fileItem = {
            title: dto.title ? dto.title : file.filename,
            type: file.mimetype,
            path: `${req.protocol}://${req.headers.host}/api/file/${file.filename}`,
            owner: user
        }
        return this.repositoryFileItem.save(fileItem);
    }

    async serveStatic(file: string, @Res() res){
        res.sendFile(file, {root: "uploads"}, (err:any)=>{
            if (err) {
                res
                  .status(404)
                  .json({
                    status: 404,
                    error: "Bad Request",
                    message: "Image isn't found"
                  })
                  .end();
            }
        });
    }
}
