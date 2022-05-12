import { ImageAnnotatorClient } from '@google-cloud/vision';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SlipVision {

    constructor(
        private readonly configService: ConfigService,
    ){}

    async label(filepath: string) {
        const keyPath = this.configService.get<string>('vision.keyPath');
        const client = new ImageAnnotatorClient({keyFilename: keyPath});
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

        return result;
    }
}