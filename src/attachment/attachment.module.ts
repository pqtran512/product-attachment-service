import { Module } from '@nestjs/common';
import { AttachmentController } from './attachment.controller';
import { AttachmentService } from './attachment.service';
import { Attachment } from 'src/attachment/attachment.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([Attachment]),
  ],
  controllers: [AttachmentController],
  providers: [AttachmentService]
})
export class AttachmentModule {}
