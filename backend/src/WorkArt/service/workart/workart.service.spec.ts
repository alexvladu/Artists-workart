import { Test, TestingModule } from '@nestjs/testing';
import { WorkArtService } from './workart.service';

describe('WorkartService', () => {
  let service: WorkArtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WorkArtService],
    }).compile();

    service = module.get<WorkArtService>(WorkArtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
