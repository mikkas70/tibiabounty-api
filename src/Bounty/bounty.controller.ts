import { Controller, Get, Param } from '@nestjs/common';
import { BountyService } from './bounty.service';
import { Bounty } from './bounty.schema';

@Controller('bounty')
export class BountyController {
  constructor(private readonly bountyService: BountyService) {}

  @Get('/list')
  async list(
    @Param('take') take: number = 10,
    @Param('skip') page: number = 0,
  ): Promise<{ total: number; data: Bounty[] }> {
    return await this.bountyService.list(take, page);
  }

  @Get('/read/:id')
  async read(@Param('id') id: string): Promise<Bounty> {
    return await this.bountyService.getById(id);
  }

  @Get('check-eligibility/:name')
  async eligibility(@Param('name') name: string): Promise<void> {
    return await this.bountyService.checkEligibility(name);
  }
}
