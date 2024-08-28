import { Module } from '@nestjs/common';
import { CarrierController } from './controllers/carrier.controller';
import { CarrierService } from './services/carrier.service';

@Module({
  controllers: [CarrierController],
  providers: [CarrierService]
})
export class CarrierModule {}
