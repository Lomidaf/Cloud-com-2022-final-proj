import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
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
        return this.fundraiserRepository.find({relations: ['owner', 'image']});
    }

    async findOne(id: string) {
        return this.fundraiserRepository.findOne(id, {relations: ['owner', 'image']});
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
            relations: ['donations']
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
