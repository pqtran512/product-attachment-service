import { BadRequestException, Body, Controller, Get, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { extname, join } from 'path';
import { diskStorage } from 'multer';
import * as fs from 'fs';
import { AttachmentService } from 'src/attachment/attachment.service';
import { buildFileTree } from 'src/utils/buildFileTree';

@Controller('attachment')
export class AttachmentController {
    constructor(private readonly attachmentService: AttachmentService) { }

    @Post('product/:productId')
    @UseInterceptors(
        FileInterceptor('file', {
            storage: diskStorage({
                destination: (req, file, callback) => {
                    const relPath = req.params.productId || '-1';
                    const fullPath = join(process.cwd(), 'upload/product', relPath)

                    fs.mkdirSync(fullPath, { recursive: true });
                    callback(null, fullPath)
                },

                filename: (req, file, callback) => {
                    const rename = Date.now() + '-' + file.originalname
                    callback(null, rename)
                }
            }),
            fileFilter: (req, file, callback) => {
                const fileTypes = ['.png', '.jpg', '.jpeg', '.pdf', '.docx']

                if (fileTypes.includes(extname(file.originalname).toLowerCase())) {
                    callback(null, true)
                } else {
                    callback(new BadRequestException('Invalid file type'), false)
                }
            }
        }))
    async uploadFile(
        @UploadedFile() file: Express.Multer.File,
        @Param('productId') productId: number
    ) {
        const saved = await this.attachmentService.saveFile(file, productId);
        return {
            message: 'File uploaded successfully',
            file: saved,
        };
    }

    @Get('tree')
    getTree() {
        return buildFileTree(join(process.cwd(), 'upload/product'));
    }

}
