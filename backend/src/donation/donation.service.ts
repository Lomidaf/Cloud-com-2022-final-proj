import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDonationDto } from './dto/create-donation.dto';
import { Donation } from './entities/donation.entity';
import { ImageAnnotatorClient } from '@google-cloud/vision';
import { UserService } from 'src/user/user.service';
import { ConfigService } from '@nestjs/config';
import { NotificationService } from 'src/notification/notification.service';
import { FundraiserService } from 'src/fundraiser/fundraiser.service';
import { SlipVision } from './slip-vision';
import { LabelDto } from './dto/label.dto';

@Injectable()
export class DonationService {
    constructor(
        @InjectRepository(Donation) private DonationRepository: Repository<Donation>,
        private userService: UserService,
        private configService: ConfigService,
        private notificationService: NotificationService,
        private fundraiserService: FundraiserService,
        private slipVision: SlipVision,
    ) {}

    async createDonation(ownerId: string, createDonationDto: CreateDonationDto) {

        const owner = await this.userService.findOne(ownerId);     
        const donateTo = createDonationDto.fundraiser.owner;

        const newDonation = {
            ...createDonationDto,
            owner:owner,
        };
        
        const donation = await this.DonationRepository.create(newDonation);
        const out = await this.DonationRepository.save(donation); 
        await this.fundraiserService.updateAmount(createDonationDto.amount, createDonationDto.fundraiser.id);
        const noticeDesc = `Donation`
        this.notificationService.createNotification(noticeDesc, donateTo, out);
        return out;                
    }

    async imageLabel(fileItem: LabelDto) {
        const filepath = './uploads/' + fileItem.receipt.title;
        const result = await this.slipVision.label(filepath);
        const company = result.logoAnnotations[0];
        const text = result.fullTextAnnotation.text;
        const description = (company && text) ? await this.getDescription(company.description, text) : {};
        return description;
    }

    async getDescription(company: string, text: string) {
        const description = {accountCompany: company}
        if (company == 'Siam Commercial Bank') {
            description['date'] = text.split('โอนเงินสำเร็จ\n')[1].split('\nรหัสอ้างอิง')[0].split('-');
            description['date'] = description['date'][0] + description['date'][1];
            let splitText = text.split('จาก\n')[0].split('0 ');
            description['accountName'] = splitText[splitText.length - 1].trim();
            description['amount'] = Number(text.split('จำนวนเงิน\n')[1].split('\n')[0].trim());         
        }
        return description;
    }
}
