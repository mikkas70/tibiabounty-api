import { Cron } from '@nestjs/schedule';
import { Injectable, Logger } from '@nestjs/common';
import { BountyService } from './bounty.service';
import { BountyStatus } from './enums/bountyStatus';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class BountySchedule {
  private readonly logger = new Logger(BountySchedule.name);

  constructor(
    private readonly bountyService: BountyService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  @Cron('*/30 * * * * *')
  async handleExpiredBounties() {
    this.logger.debug('Checking for expired bounties...');

    const expired = await this.bountyService.getExpirable();

    expired.map(async (bounty) => {
      await this.bountyService.setStatus(bounty._id, BountyStatus.EXPIRED);
      this.eventEmitter.emit('bounty.expired', bounty);
    });
  }
}
