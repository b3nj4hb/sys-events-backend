import { Module } from '@nestjs/common';
import { StudentEventController } from './controllers/student-event.controller';
import { StudentEventService } from './services/student-event.service';

@Module({
  controllers: [StudentEventController],
  providers: [StudentEventService]
})
export class StudentEventModule {}
