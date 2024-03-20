import { Controller, Get, Res } from '@nestjs/common';
import { ApiExcludeController } from '@nestjs/swagger';

@ApiExcludeController()
@Controller('/')
export class HomeController {
  @Get()
  async home(@Res() res: any) {
    return res.status(301).redirect('/api/docs');
  }
}
