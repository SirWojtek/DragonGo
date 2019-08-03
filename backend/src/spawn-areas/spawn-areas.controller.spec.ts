import { Test, TestingModule } from '@nestjs/testing';
import { SpawnAreasController } from './spawn-areas.controller';

describe('SpawnAreas Controller', () => {
  let controller: SpawnAreasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SpawnAreasController],
    }).compile();

    controller = module.get<SpawnAreasController>(SpawnAreasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
