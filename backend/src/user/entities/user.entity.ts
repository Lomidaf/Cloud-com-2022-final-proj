import { Donation } from 'src/donation/entities/donation.entity';
import { FileItem } from 'src/file/entities/fileItem.entity';
import { Fundraiser } from 'src/fundraiser/entities/fundraiser.entity';
import { Notice } from 'src/notification/entities/notification.entity';
import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';
import { Gender } from '../enum/gender.enum';

@Entity()
export class User {
  @PrimaryColumn()
  id: string;

  @Column()
  email: string;

  @Column()
  name: string;

  @Column({
        type: "enum",
        enum: Gender,
        default: Gender.OTHER
    })
  gender: Gender;

  @Column()
  birthDate: Date;

  @Column({ nullable : true })
  intro: string;

  @OneToMany(() => Fundraiser, fundraiser => fundraiser.owner)
  fundraisers: Fundraiser[];

  @OneToMany(() => FileItem, file => file.owner)
  files: FileItem[];

  @OneToMany(() => Donation, donation => donation.owner)
  donations: Donation[];

  @OneToMany(() => Notice, notice => notice.owner)
  notifications: Notice[];
}

