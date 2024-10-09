import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/database.config';
import { ProfileModule } from './modules/profile/profile.module';
import { StudentModule } from './modules/student/student.module';
import { EventModule } from './modules/event/event.module';
import { StudentEventModule } from './modules/student-event/student-event.module';
import { CarrierModule } from './modules/carrier/carrier.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
	imports: [TypeOrmModule.forRoot(typeOrmConfig), ProfileModule, StudentModule, EventModule, StudentEventModule, CarrierModule, AuthModule],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
