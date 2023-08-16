import { Module } from '@nestjs/common';
import { HotelsSimulatorService } from './hotels-simulator.service';

@Module({
  providers: [HotelsSimulatorService],
  exports: [HotelsSimulatorService]
})
export class HotelsSimulatorModule {}
