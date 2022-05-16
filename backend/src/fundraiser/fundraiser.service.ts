import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { count } from 'console';
import { Donation } from 'src/donation/entities/donation.entity';
import { FileItem } from 'src/file/entities/fileItem.entity';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { createQueryBuilder, Repository } from 'typeorm';
import { CreateFundraiserDto } from './dto/create-fundraiser.dto';
import { UpdateFundraiserDto } from './dto/update-fundraiser.dto';
import { Fundraiser } from './entities/fundraiser.entity';

@Injectable()
export class FundraiserService {    
    constructor(
        @InjectRepository(Fundraiser) private fundraiserRepository: Repository<Fundraiser>,
        private readonly userService: UserService,
    ) {}
    async findAll() {
        const date = new Date();
        date.setHours(0, 0, 0, 0);
        const recent = await this.fundraiserRepository.createQueryBuilder('fundraiser')
        .addSelect('COUNT(DISTINCT donations)')
        .leftJoin('fundraiser.donations', 'donations', 'donations.createdAt >= :today', { today: date})
        .groupBy('fundraiser.id')
        .getRawMany()

        const fundraiser = await this.fundraiserRepository.createQueryBuilder('fundraiser')
        .addSelect("COUNT(DISTINCT donations)", "donation_count")
        .leftJoinAndSelect('fundraiser.owner', 'owner')
        .leftJoinAndSelect('fundraiser.image', 'image')
        .leftJoin('fundraiser.donations', 'donations')
        .groupBy('fundraiser.id')
        .addGroupBy('owner.id')
        .addGroupBy('image.id')
        .getRawMany()

        return {recent: recent, fundraiser: fundraiser}

    }

    async findOne(id: string) {
        const date = new Date();
        date.setHours(0, 0, 0, 0);
        const recent = await this.fundraiserRepository.createQueryBuilder('fundraiser')
        .select('COUNT(donations)')
        .leftJoin('fundraiser.donations', 'donations', 'donations.createdAt >= :today', { today: date})
        .where('fundraiser.id = :id',{id})
        .getRawOne()

        const fundraiser = await this.fundraiserRepository.createQueryBuilder('fundraiser')
        .addSelect("COUNT(donations)", "donation_count")
        .leftJoinAndSelect('fundraiser.owner', 'owner')
        .leftJoinAndSelect('fundraiser.image', 'image')
        .leftJoin('fundraiser.donations', 'donations')
        .where('fundraiser.id = :id',{id})
        .groupBy('fundraiser.id')
        .addGroupBy('owner.id')
        .addGroupBy('image.id')
        .getRawOne()

        return {recent: recent, fundraiser: fundraiser}
    }

    async findOwner(id: string): Promise<User> {
        return (await this.fundraiserRepository.findOne(id,
            { relations: ['owner'] })).owner
    }

    async createFundraiser(ownerId: string, createFundraiser: CreateFundraiserDto) {
        const owner = await this.userService.findOne(ownerId);
        const newFundraiser = {owner: owner, ...createFundraiser}
        const fundraiser = await this.fundraiserRepository.create(newFundraiser);
        return this.fundraiserRepository.save(fundraiser);
    }

    async updateFundraiser(id: string, updateFundraiser: UpdateFundraiserDto, ownerId: string) {
        
        const fundraiser = await this.fundraiserRepository.findOne(id, {relations: ['owner']});
        if (fundraiser.owner.id != ownerId) {
            throw new BadRequestException();
        }
        return await this.fundraiserRepository.save({
            id: id,
            ...updateFundraiser
        });
    }

    async findDonation(id:string) {
        return this.fundraiserRepository.find({
            where:{id: id},
            relations: ['donations', 'donations.receipt']
        })
    }

    async updateAmount(amount: number, id:string) {
        const fundraiser = await this.fundraiserRepository.findOne(id);
        const updateFundraiser = {
            ...fundraiser,
            currentAmount: amount + fundraiser.currentAmount,
        }
        return this.fundraiserRepository.save(updateFundraiser);
    }
}
