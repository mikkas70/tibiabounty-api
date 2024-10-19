import { Cron } from '@nestjs/schedule';
import { Injectable, Logger } from '@nestjs/common';
import { BountyService } from './bounty.service';
import { BountyStatus } from './enums/bountyStatus';

@Injectable()
export class BountySchedule {
  private readonly logger = new Logger(BountySchedule.name);

  constructor(private readonly bountyService: BountyService) {}

  @Cron('* */1 * * * *')
  async handleExpiredBounties() {
    this.logger.debug('Checking for expired bounties...');

    const expired = await this.bountyService.getActiveExpired();

    expired.map(async (bounty) => {
      this.logger.debug('Found expired bounty - ' + bounty._id);
      await this.bountyService.updateStatus(bounty._id, BountyStatus.EXPIRED);
    });
  }
}
