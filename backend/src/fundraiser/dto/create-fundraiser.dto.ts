import { IsNotEmpty, IsOptional, IsString} from 'class-validator';
import { FileItem } from 'src/file/entities/fileItem.entity';

export class CreateFundraiserDto {
  @IsNotEmpty()
  type: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  goal: number;

  @IsNotEmpty()
  bankAccount: string;

  @IsNotEmpty()
  accountOwner: string;

  @IsNotEmpty()
  accountCompany: string;

  @IsOptional()
  description: string;

  @IsOptional()
  image: FileItem;

}
