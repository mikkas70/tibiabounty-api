import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { Logger } from '@nestjs/common';
import { BountyCollectorService } from './bountyCollector.service';

@Processor('bounty_payment', { concurrency: 1 })
export class BountyCollectorConsumer extends WorkerHost {
  private logger = new Logger(BountyCollectorConsumer.name);

  constructor(private readonly bountyCollectorService: BountyCollectorService) {
    super();
  }

  async process(job: Job<{ id: string }>): Promise<any> {
    const bountyCollector = await this.bountyCollectorService.getById(
      job.data.id,
    );

    // TODO - Trigger AWS Lambda to pay bounty collector
  }
}
