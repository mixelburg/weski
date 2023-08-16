import {Test, TestingModule} from '@nestjs/testing';
import {HotelsSimulatorService} from './hotels-simulator.service';
import {ConfigModule} from "@nestjs/config";
import {config} from 'dotenv'

config()

describe('HotelsSimulatorService', () => {
  let service: HotelsSimulatorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot({isGlobal: true})],
      providers: [HotelsSimulatorService],
    }).compile();

    service = module.get<HotelsSimulatorService>(HotelsSimulatorService);
  });


  it('should work', async () => {
    const res = (await service.findHotels({
      fromDate: new Date('2021-01-01'),
      toDate: new Date('2024-01-08'),
      groupSize: 1,
      site: 1
    }).next()).value
    console.log(res)

    expect(res.hotels.length).toBeGreaterThan(0)
  })
});
