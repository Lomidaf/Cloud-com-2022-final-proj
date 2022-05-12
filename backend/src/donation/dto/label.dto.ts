import { IsNotEmpty } from "class-validator";
import { FileItem } from "src/file/entities/fileItem.entity";

export class LabelDto {
    @IsNotEmpty()
    receipt: FileItem;

  }