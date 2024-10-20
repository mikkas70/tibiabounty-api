import { Cron } from '@nestjs/schedule';
import { Injectable, Logger } from '@nestjs/common';
import { BountyCollectorService } from './bountyCollector.service';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';

@Injectable()
export class BountyCollectorSchedule {
  private readonly logger = new Logger(BountyCollectorSchedule.name);

  constructor(
    private readonly bountyCollectorService: BountyCollectorService,
    @InjectQueue('bounty_payment') private queue: Queue,
  ) {}

  @Cron('* */2 * * * *')
  async handleUnpaidBountyCollectors() {
    this.logger.debug('Checking for unpaid bounty collectors...');

    const unpaidBountyCollectors =
      await this.bountyCollectorService.getUnpaid();

    unpaidBountyCollectors.map(async (bountyCollector) => {
      await this.queue.add(
        '',
        { id: bountyCollector._id.toString() },
        {
          jobId: bountyCollector._id.toString(),
          removeOnComplete: true,
          removeOnFail: true,
        },
      );
    });
  }
}
