import { Test, TestingModule } from '@nestjs/testing';
import { SpawnAreasService } from './spawn-areas.service';

describe('SpawnAreasService', () => {
  let service: SpawnAreasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SpawnAreasService],
    }).compile();

    service = module.get<SpawnAreasService>(SpawnAreasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
