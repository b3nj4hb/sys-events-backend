import { Module } from '@nestjs/common';
import { StudentController } from './controllers/student.controller';
import { StudentService } from './services/student.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentEntity } from './entities/student.entity';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { multerConfig } from 'src/config/multer.config';

@Module({
	controllers: [StudentController],
	providers: [StudentService],
	imports: [TypeOrmModule.forFeature([StudentEntity]), MulterModule.register(multerConfig)],
})
export class StudentModule {}
