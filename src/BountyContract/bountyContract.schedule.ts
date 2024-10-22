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
}
