import { Body, Controller, Get, Param, ParseIntPipe, Post, Put, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { FirebaseAuthGuard } from 'src/auth/guards/firebase-auth.guard';
import { CreateFundraiserDto } from './dto/create-fundraiser.dto';
import { UpdateFundraiserDto } from './dto/update-fundraiser.dto';
import { FundraiserService } from './fundraiser.service';

@Controller('fundraiser')
export class FundraiserController {
    constructor(private readonly service: FundraiserService) {}

    @Get()
    async findAll() {
        return await this.service.findAll();
    }

    @Get(':id')
    @UseGuards(FirebaseAuthGuard)
    async findOne(@Param('id') id: string) {
        return await this.service.findOne(id);
    }

    @Post()
    @UseGuards(FirebaseAuthGuard)
    @UsePipes(new ValidationPipe({ whitelist: true }))
    async createFundraiser(
        @Req() req,
        @Body() createFundraiserDto: CreateFundraiserDto
        ) {
        return await this.service.createFundraiser(req.user.uid, createFundraiserDto);
    }

    @Put(':id')
    @UseGuards(FirebaseAuthGuard)
    @UsePipes(new ValidationPipe({ whitelist: true }))
    async updateFundraiser(@Param('id') id: string, @Body() updateFundraiserDto: UpdateFundraiserDto, @Req() request) {
        const ownerId = request.user.uid;
        return await this.service.updateFundraiser(id, updateFundraiserDto, ownerId);
    }
}
