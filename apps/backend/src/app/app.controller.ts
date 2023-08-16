import {Body, Controller, Get, Param, Post, Query} from '@nestjs/common'

import { AppService } from './app.service'
import {SkiQuery} from "@weski/types";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('health')
  getData() {
    return this.appService.health()
  }

  @Post('')
  async queryHotels(
    @Body() data: SkiQuery
  ) {
    return this.appService.queryHotels(data)
  }

  @Get(':id')
  async getHotels(
    @Param('id') id: string,
  ) {
    return this.appService.getRequest(id)
  }
}
