import { Cron } from '@nestjs/schedule';
import { Injectable, Logger } from '@nestjs/common';
import { BountyContractService } from './bountyContract.service';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class BountyContractSchedule {
  private readonly logger = new Logger(BountyContractSchedule.name);

  constructor(
    private readonly bountyContractService: BountyContractService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  @Cron('*/20 * * * * *')
  async handlePaidContracts() {
    this.logger.debug('Checking for paid contracts...');

    const contracts = await this.bountyContractService.getReadyForExecution();

    contracts.map(async (contract) =>
      this.eventEmitter.emit('bountyContract.paid', contract),
    );
  }
}
