import { IsNotEmpty, IsOptional, IsString} from 'class-validator';
import { FileItem } from 'src/file/entities/fileItem.entity';

export class UpdateFundraiserDto {
  @IsOptional()
  type: string;

  @IsOptional()
  title: string;

  @IsOptional()
  goal: number;

  @IsOptional()
  description: string;

  @IsOptional()
  image: FileItem;

  @IsOptional()
  bankAccount: string;

  @IsOptional()
  accountOwner: string;

  @IsOptional()
  accountCompany: string;

}
