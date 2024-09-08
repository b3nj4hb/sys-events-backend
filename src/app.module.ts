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
import { SeedModule } from './seed/seed.module';
import { IsUniqueConstraint } from './shared/validation/is-unique-constraint';

@Module({
	imports: [TypeOrmModule.forRoot(typeOrmConfig), ProfileModule, StudentModule, EventModule, StudentEventModule, CarrierModule, SeedModule],
	controllers: [AppController],
	providers: [AppService, IsUniqueConstraint],
})
export class AppModule {}
