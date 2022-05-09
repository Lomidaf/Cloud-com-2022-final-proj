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
        return this.fundraiserRepository.find();
    }

    async findOne(id: string) {
        return this.fundraiserRepository.findOne(id);
    }

    async createFundraiser(ownerId: string, createFundraiser: CreateFundraiserDto) {
        let owner = await this.userService.findOne(ownerId);
        if (!owner) {
            owner = await this.userService.create(ownerId)
        }
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
}
