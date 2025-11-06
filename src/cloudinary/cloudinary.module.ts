import { Module } from '@nestjs/common';
import { CloudinaryService } from './cloudinary.service';
import { CloudinaryController } from './cloudinary.controller';
import { CloudinaryConfig } from '../config/cloudinary';

@Module({
  controllers: [CloudinaryController],
  providers: [CloudinaryService, CloudinaryConfig],
})
export class CloudinaryModule {}
