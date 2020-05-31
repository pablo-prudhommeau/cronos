import {Controller, Get, HttpCode} from '@nestjs/common';

@Controller()
export class AppController {

    @Get('isAlive')
    @HttpCode(204)
    isAlive(): void {}

}
