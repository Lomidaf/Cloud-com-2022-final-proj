import { Donation } from 'src/donation/entities/donation.entity';
import { FileItem } from 'src/file/entities/fileItem.entity';
import { Fundraiser } from 'src/fundraiser/entities/fundraiser.entity';
import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';

@Entity()
export class User {
  @PrimaryColumn()
  id: string;

  @OneToMany(() => Fundraiser, fundraiser => fundraiser.owner)
  fundraisers: Fundraiser[];

  @OneToMany(() => FileItem, file => file.owner)
  files: FileItem[];

  @OneToMany(() => Donation, donation => donation.owner)
  donations: Donation[];
}

