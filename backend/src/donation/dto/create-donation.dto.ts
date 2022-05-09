import { IsNotEmpty, IsOptional } from "class-validator";
import { FileItem } from "src/file/entities/fileItem.entity";
import { Fundraiser } from "src/fundraiser/entities/fundraiser.entity";

export class CreateDonationDto {
  
    @IsNotEmpty()
    amount: number;
  
    @IsOptional()
    description: string;
  
    @IsNotEmpty()
    receipt: FileItem;
  
    @IsNotEmpty()
    fundraiser: Fundraiser;
  }