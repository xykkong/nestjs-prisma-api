import { Controller, Get, Res } from '@nestjs/common';

@Controller()
export class HealthCheckController {
  @Get()
  async index(@Res() res) {
    res.status(302).redirect('/api');
  }

  @Get('health')
  async healthcheck(): Promise<{ msg: string }> {
    return { msg: 'OK' };
  }
}
