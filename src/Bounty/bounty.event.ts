import { Injectable, Logger } from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { BountyContract } from '../BountyContract/bountyContract.schema';
import { BountyService } from './bounty.service';

@Injectable()
export class BountyEvent {
  private readonly logger = new Logger(BountyEvent.name);

  constructor(
    private readonly bountyService: BountyService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  @OnEvent('bountyContract.paid')
  async handleBountyContractPaid(contract: BountyContract) {
    let bounty = await this.bountyService.getActiveForCharacter(
      contract.target_character,
    );

    if (bounty) {
      await this.bountyService.setValue(
        bounty._id,
        bounty.value + contract.value, // TODO - Should we also update the expiration date? (eg: Incentivize players to add more money to the bounty to extend the expiration date)
      );
    } else {
      bounty = await this.bountyService.create({
        target_character: contract.target_character,
        requester_character: contract.requester_character,
        value: contract.value,
        expires_at: contract.expires_at, // TODO - EXPIRES AT CANNOT BE CONTRACT DATE, NEEDS TO BE NOW + X DAYS
      });
    }

    this.eventEmitter.emit('bounty.assigned', bounty, contract);
  }
}
