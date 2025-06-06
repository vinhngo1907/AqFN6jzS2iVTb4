import { BadRequestException, Body, Controller, Get, Post, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FileUpload } from './file-upload.interface';
import { FileUploadByS3 } from './strategies/s3';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileUploadDTO } from './dto/file-upload.dto';

@ApiTags('Upload file')
@Controller('file')
export class FileUploadController {
    private fileUpload: FileUpload;
    constructor() {
        this.fileUpload = new FileUploadByS3();
    }
    @Post()
    @UseInterceptors(FileInterceptor('file'))
    async create(
        @UploadedFile() file: Express.Multer.File,
        @Body() fileUploadDTO: FileUploadDTO,
    ) {
        console.log(">>>>", fileUploadDTO)
        if (!file) throw new BadRequestException('File is required');
        if (!fileUploadDTO.type) throw new BadRequestException('Type is required');

        const data = await this.fileUpload.uploadFile(file, fileUploadDTO.type);

        return { data };
    }

    @Get()
    async getAll(@Query('marker') marker: string) {
        return await this.fileUpload.getAllFile(marker);
    }
}
