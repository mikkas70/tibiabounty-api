import { Injectable, Logger } from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { BountyContract } from '../BountyContract/bountyContract.schema';
import { Bounty } from '../Bounty/bounty.schema';
import { BountyContractService } from './bountyContract.service';

@Injectable()
export class BountyContractEvent {
  private readonly logger = new Logger(BountyContractEvent.name);

  constructor(
    private readonly eventEmitter: EventEmitter2,
    private readonly bountyContractService: BountyContractService,
  ) {}

  @OnEvent('bountyContract.assigned')
  async handleBountyContractAssigned(contract: BountyContract, bounty: Bounty) {
    await this.bountyContractService.assignBounty(contract._id, bounty._id);
  }
}
