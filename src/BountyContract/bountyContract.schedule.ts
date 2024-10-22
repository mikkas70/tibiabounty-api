import { Cron } from '@nestjs/schedule';
import { Injectable, Logger } from '@nestjs/common';
import { BountyContractService } from './bountyContract.service';
import { BountyService } from '../Bounty/bounty.service';
import { BountyStatus } from '../Bounty/enums/bountyStatus';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class BountyContractSchedule {
  private readonly logger = new Logger(BountyContractSchedule.name);

  constructor(
    private readonly bountyContractService: BountyContractService,
    private readonly bountyService: BountyService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  @Cron('* */2 * * * *')
  async handlePaidContracts() {
    const contracts = await this.bountyContractService.getReadyForExecution();

    contracts.map(async (contract) => {
      let bounty = await this.bountyService.getActiveForCharacter(
        contract.target_character,
      );

      if (bounty) {
        // TODO - Should we also update the expiration date? (eg: Incentivize players to add more money to the bounty to extend the expiration date)
        await this.bountyService.setValue(
          bounty._id,
          bounty.value + contract.value,
        );
      } else {
        bounty = await this.bountyService.create({
          target_character: contract.target_character,
          requester_character: contract.requester_character,
          is_anonymous: contract.is_anonymous,
          value: contract.value,
          status: BountyStatus.ACTIVE,
          expires_at: contract.expires_at, // TODO - EXPIRES AT CANNOT BE CONTRACT DATE, NEEDS TO BE NOW + X DAYS
        });
      }

      await this.bountyContractService.assignBounty(contract._id, bounty._id);
    });
  }
}
