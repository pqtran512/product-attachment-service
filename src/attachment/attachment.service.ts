import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Attachment } from 'src/attachment/attachment.entity';
import { Repository } from 'typeorm';
import * as path from 'path';
import { HashMap } from 'src/utils/hashmap';

@Injectable()
export class AttachmentService {
    private map = new HashMap<string, Attachment>();

    constructor(
        @InjectRepository(Attachment)
        private readonly attachmentRepo: Repository<Attachment>,
    ) { }

    async saveFile(file: Express.Multer.File, productId?: number) {
        const entity = this.attachmentRepo.create({
            filename: file.filename,
            path: file.path,
            extension: path.extname(file.filename),
            size: file.size,
            mime_type: file.mimetype,
            product: productId ? { id: productId } : null,
        });

        const atm = await this.attachmentRepo.save(entity);

        this.map.set(atm.id.toString(), atm);

        return atm
    }

    async getTree() {
        const data = this.map.entries();
        const all = data.map(([k, v]) => v);
        return all;
    }
}
