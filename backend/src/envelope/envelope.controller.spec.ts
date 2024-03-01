import { Test, TestingModule } from '@nestjs/testing';
import { EnvelopeController } from './envelope.controller';
import { EnvelopeService } from './envelope.service';

describe('EnvelopeController', () => {
  let controller: EnvelopeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EnvelopeController],
      providers: [EnvelopeService],
    }).compile();

    controller = module.get<EnvelopeController>(EnvelopeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
