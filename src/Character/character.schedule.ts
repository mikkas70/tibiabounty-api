import { CharacterService } from './character.service';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { Cron } from '@nestjs/schedule';
import { Logger } from '@nestjs/common';

export class CharacterSchedule {
  private readonly logger = new Logger(CharacterSchedule.name);

  constructor(
    private readonly characterService: CharacterService,
    @InjectQueue('character') private queue: Queue,
  ) {}

  @Cron('*/30 * * * * *')
  async handleStaleCharacters() {
    this.logger.debug('Checking stale characters...');

    const characters = await this.characterService.getStale();

    characters.map(async (character) => {
      await this.queue.add(
        '',
        { id: character._id.toString() },
        {
          jobId: character._id.toString(),
          removeOnComplete: true,
          removeOnFail: true,
        },
      );
    });
  }
}