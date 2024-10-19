import { Controller } from '@nestjs/common';
import { BountyCollectionService } from './bountyCollection.service';

@Controller('bounty')
export class BountyCollectionController {
  constructor(
    private readonly bountyCollectionService: BountyCollectionService,
  ) {}
}
