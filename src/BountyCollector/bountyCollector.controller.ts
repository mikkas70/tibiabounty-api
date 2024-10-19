import { Controller } from '@nestjs/common';
import { BountyCollectorService } from './bountyCollector.service';

@Controller('bounty-collector')
export class BountyCollectorController {
  constructor(
    private readonly bountyCollectorService: BountyCollectorService,
  ) {}
}
