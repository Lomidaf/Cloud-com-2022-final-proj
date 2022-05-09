import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Donation } from 'src/donation/entities/donation.entity';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { Notice } from './entities/notification.entity';

@Injectable()
export class NotificationService {
    constructor(
        @InjectRepository(Notice) private noticeRepository: Repository<Notice>,
    ) {}

    async createNotification(description: string, owner: User, donation): Promise<Notice> {
        const newNotification = {
            owner: owner,
            description: description,
            isRead: false,
            donation: donation,
        };
        const notice = await this.noticeRepository.create(newNotification);
        return this.noticeRepository.save(notice);
    }

    async findOne(id: string): Promise<Notice> {
        return this.noticeRepository.findOne(id);
    }
}
