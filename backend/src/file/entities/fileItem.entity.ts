import { Donation } from "src/donation/entities/donation.entity";
import { Fundraiser } from "src/fundraiser/entities/fundraiser.entity";
import { User } from "src/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
@Entity()
export class FileItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  type: string;

  @Column()
  path: string;

  @CreateDateColumn()
  createdAt: Date;
  // @OneToOne(() => Donation)
  // donation: Donation;

  @ManyToOne(() => User, user => user.files)
  owner: User;

  @OneToMany(() => Fundraiser, fundraiser => fundraiser.image)
  fundraisers: Fundraiser[];
}
