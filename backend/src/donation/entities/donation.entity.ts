import { FileItem } from "src/file/entities/fileItem.entity";
import { Fundraiser } from "src/fundraiser/entities/fundraiser.entity";
import { User } from "src/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
@Entity()
export class Donation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  description: string;

  @Column({nullable: false })
  amount: number;

  @Column({ nullable: true })
  accountName: string;

  @Column({ nullable: true })
  accountCompany: string;

  @Column({ nullable: true })
  date: string;

  @CreateDateColumn()
  createdAt: Date;
  
  @OneToOne(() => FileItem)
  @JoinColumn()
  receipt: FileItem;

  @ManyToOne(() => User, user => user.donations)
  owner: User;

  @ManyToOne(() => Fundraiser, fundraiser => fundraiser.donations)
  fundraiser: Fundraiser;  
}
