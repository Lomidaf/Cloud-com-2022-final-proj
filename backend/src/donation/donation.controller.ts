import { Body, Controller, Post, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { FirebaseAuthGuard } from 'src/auth/guards/firebase-auth.guard';
import { DonationService } from './donation.service';
import { CreateDonationDto } from './dto/create-donation.dto';

@Controller('donation')
export class DonationController {
    constructor(private readonly service: DonationService) {}

    @Post()
    @UseGuards(FirebaseAuthGuard)
    @UsePipes(new ValidationPipe({ whitelist: true }))
    async createDonation(
        @Req() req,
        @Body() createDonationDto: CreateDonationDto
        ) {
        return await this.service.createDonation(req.user.uid, createDonationDto);
    }
    
}
