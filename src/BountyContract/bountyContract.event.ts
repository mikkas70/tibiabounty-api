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

  @OnEvent('bounty.assigned')
  async handleBountyContractAssigned(bounty: Bounty, contract: BountyContract) {
    await this.bountyContractService.assignBounty(contract._id, bounty._id);
  }

  @OnEvent('bounty.expired')
  async handleBountyExpired(bounty: Bounty) {
    const contracts = await this.bountyContractService.getAllByBounty(
      bounty._id,
    );

    // TODO - Add to queue to process player refund.
  }
}
