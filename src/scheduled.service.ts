import { Injectable, Logger } from '@nestjs/common';
import { CharacterService } from './Character/character.service';
import { Cron } from '@nestjs/schedule';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';

@Injectable()
export class ScheduledService {
  private readonly logger = new Logger(ScheduledService.name);

  constructor(
    private readonly characterService: CharacterService,
    @InjectQueue('character') private queue: Queue,
  ) {}

  @Cron('*/4 * * * * *')
  async handleStaleCharacters() {
    this.logger.debug('Checking stale characters...');

    const characters = await this.characterService.getStale();

    characters.map(async (character) => {
      await this.queue.add(
        '',
        { id: character._id.toString() },
        { jobId: character._id.toString() },
      );
    });
  }
}
