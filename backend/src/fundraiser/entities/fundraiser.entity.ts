import { Donation } from 'src/donation/entities/donation.entity';
import { FileItem } from 'src/file/entities/fileItem.entity';
import { User } from 'src/user/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, CreateDateColumn } from 'typeorm';

@Entity()
export class Fundraiser {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  type: string;

  @Column()
  description: string;

  @Column({ nullable: false })
  goal: number;

  @Column({ nullable: false })
  bankAccount: string;

  @Column({ nullable: false })
  accountOwner: string;

  @Column({ nullable: false })
  accountCompany: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne( () => User, user => user.fundraisers)
  owner: User;

  @ManyToOne( () => FileItem, file => file.fundraisers)
  image: FileItem;

  @OneToMany( () => Donation, donation => donation.fundraiser)
  donations: Donation[];
}
