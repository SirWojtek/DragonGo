import { Test, TestingModule } from '@nestjs/testing';
import { MonstersController } from './monsters.controller';

describe('Monsters Controller', () => {
  let controller: MonstersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MonstersController],
    }).compile();

    controller = module.get<MonstersController>(MonstersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
