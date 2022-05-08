import { Injectable, NotImplementedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private repositoryUser: Repository<User>,
    ){}


    async findOne(id: string) {
        return this.repositoryUser.findOne(id);
    }

    async create(id: string) {
        const user = this.repositoryUser.create({id: id});
        return this.repositoryUser.save(user);
    } 
}
