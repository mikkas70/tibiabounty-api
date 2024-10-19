import { Controller, Get, Param } from '@nestjs/common';
import { ContractService } from './contract.service';
import { Contract } from './contract.schema';

@Controller('bounty')
export class ContractController {
  constructor(private readonly contractService: ContractService) {}

  @Get('/list')
  async list(
    @Param('take') take: number = 10,
    @Param('skip') page: number = 0,
  ): Promise<{ total: number; bounties: Contract[] }> {
    return await this.contractService.list(take, page);
  }

  @Get('/read/:id')
  async read(@Param('id') id: string): Promise<Contract> {
    return await this.contractService.getById(id);
  }
}
