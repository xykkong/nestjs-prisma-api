import { Test, TestingModule } from '@nestjs/testing';
import { HealthCheckController } from './healthcheck.controller';

describe('PersonController', () => {
  let healthcheckController: HealthCheckController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [HealthCheckController],
    }).compile();

    healthcheckController = app.get<HealthCheckController>(
      HealthCheckController,
    );
  });

  describe('root', () => {
    it('should return "OK"', async () => {
      expect(await healthcheckController.healthcheck()).toMatchObject({
        msg: 'OK',
      });
    });
  });
});
