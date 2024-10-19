import { Controller, Get, Param } from '@nestjs/common';
import { BountyContractService } from './bountyContract.service';
import { BountyContract } from './bountyContract.schema';

@Controller('bounty')
export class BountyContractController {
  constructor(private readonly bountyContractService: BountyContractService) {}

  @Get('/list')
  async list(
    @Param('take') take: number = 10,
    @Param('skip') page: number = 0,
  ): Promise<{ total: number; data: BountyContract[] }> {
    return await this.bountyContractService.list(take, page);
  }

  @Get('/read/:id')
  async read(@Param('id') id: string): Promise<BountyContract> {
    return await this.bountyContractService.getById(id);
  }
}
