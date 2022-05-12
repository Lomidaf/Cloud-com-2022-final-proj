import { Injectable, NotImplementedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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
        return this.repositoryUser.findOne(id,
        {
            relations: ['fundraisers']
        })
      }
}
