import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDonationDto } from './dto/create-donation.dto';
import { Donation } from './entities/donation.entity';
import { ImageAnnotatorClient } from '@google-cloud/vision';
import { UserService } from 'src/user/user.service';
import { ConfigService } from '@nestjs/config';
import { NotificationService } from 'src/notification/notification.service';

@Injectable()
export class DonationService {
    constructor(
        @InjectRepository(Donation) private DonationRepository: Repository<Donation>,
        private userService: UserService,
        private configService: ConfigService,
        private notificationService: NotificationService,
    ) {}

    async createDonation(ownerId: string, createDonationDto: CreateDonationDto) {
        let owner = await this.userService.findOne(ownerId);
        if (!owner) {
            owner = await this.userService.create(ownerId)
        }
        const keyPath = this.configService.get<string>('vision.keyPath')
        const client = new ImageAnnotatorClient({keyFilename: keyPath});
        const filepath = './uploads/' + createDonationDto.receipt.title;
        const [result] = await client.annotateImage({
            image: {
                source: { filename: filepath},
            },
            features: [
                {
                    type: 'LOGO_DETECTION',
                },
                {
                    type: 'TEXT_DETECTION'
                }
            ]
        })
        const company = result.logoAnnotations[0];
        const text = result.fullTextAnnotation.text;
        let description;        
        if (company && text) {
            description = await this.getDescription(company.description, text);
        }     

        const newDonation = {
            ...description,
            ...createDonationDto,
            owner:owner,
        };
        const donation = await this.DonationRepository.create(newDonation);
        const out = await this.DonationRepository.save(donation); 
        const noticeDesc = `Donation`
        this.notificationService.createNotification(noticeDesc, owner, out);
        return out;                
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
