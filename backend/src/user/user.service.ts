import { Injectable, NotImplementedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Fundraiser } from 'src/fundraiser/entities/fundraiser.entity';
import { createQueryBuilder, Repository } from 'typeorm';
import { RegisterDto } from './dto/register.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {    
    constructor(
        @InjectRepository(User) private repositoryUser: Repository<User>,
    ){}


    async findOne(id: string) {
        return this.repositoryUser.findOne(id);
    }

    async create(id: string, registerDto: RegisterDto) {
        const newUser = {
            id: id,
            ...registerDto
        }
        const user = this.repositoryUser.create(newUser);
        return this.repositoryUser.save(user);
    } 

    async getNotice(id: string) {
        return this.repositoryUser.findOne(id,
        {
            relations: ["notifications"]
        });
    }

    async getFundraiser(id: string) {
        const date = new Date();
        date.setHours(0, 0, 0, 0);
        const recent = await createQueryBuilder('fundraiser')
        .select('fundraiser')
        .addSelect('COUNT(DISTINCT donations)')
        .from(Fundraiser, 'fundraiser')
        .leftJoin('fundraiser.donations', 'donations', 'donations.createdAt >= :today', { today: date})
        .leftJoinAndSelect('fundraiser.owner', 'owner')
        .where('owner.id = :id',{id})        
        .groupBy('fundraiser.id')
        .addGroupBy('owner.id')
        .getRawMany()

        const fundraiser = await createQueryBuilder('fundraiser')
        .select('fundraiser')
        .addSelect("COUNT(DISTINCT donations)", "donation_count")
        .from(Fundraiser, 'fundraiser')
        .leftJoinAndSelect('fundraiser.owner', 'owner')
        .leftJoinAndSelect('fundraiser.image', 'image')
        .leftJoin('fundraiser.donations', 'donations')
        .where('owner.id = :id',{id})
        .groupBy('fundraiser.id')
        .addGroupBy('owner.id')
        .addGroupBy('image.id')
        .getRawMany()

        return {recent: recent, fundraiser: fundraiser}
    }
}
