import { Controller } from '@nestjs/common';
import { BountyCollectionParticipantService } from './bountyCollectionParticipant.service';

@Controller('bounty-collection-participant')
export class BountyCollectionParticipantController {
  constructor(
    private readonly bountyCollectionService: BountyCollectionParticipantService,
  ) {}
}
