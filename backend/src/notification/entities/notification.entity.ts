import { Donation } from "src/donation/entities/donation.entity";
import { FileItem } from "src/file/entities/fileItem.entity";
import { User } from "src/user/entities/user.entity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, OneToOne, JoinColumn } from "typeorm";

@Entity()
export class Notice {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  description: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column()
  isRead: Boolean;

  @ManyToOne(() => User, user => user.notifications)
  owner: User;

  @OneToOne(() => Donation)
  @JoinColumn()
  donation: Donation;
}
