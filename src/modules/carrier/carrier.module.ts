import { Module } from '@nestjs/common';
import { CarrierController } from './controllers/carrier.controller';
import { CarrierService } from './services/carrier.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarrierEntity } from './entities/carrier.entity';

@Module({
	controllers: [CarrierController],
	providers: [CarrierService],
	imports: [TypeOrmModule.forFeature([CarrierEntity])],
})
export class CarrierModule {}
