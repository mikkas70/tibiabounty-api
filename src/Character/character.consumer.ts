import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { CharacterService } from './character.service';
import { TibiaService } from '../Tibia/tibia.service';
import { Logger } from '@nestjs/common';

@Processor('character', { concurrency: 5 })
export class CharacterConsumer extends WorkerHost {
  private logger = new Logger(CharacterConsumer.name);

  constructor(
    private readonly characterService: CharacterService,
    private readonly tibiaService: TibiaService,
  ) {
    super();
  }

  async process(job: Job<{ id: string }>): Promise<any> {
    const character = await this.characterService.getById(job.data.id);

    await this.tibiaService.character(character.name).then((data) => {
      this.logger.debug(
        'TODO - Implement logic to update character data with Tibia API data',
      );
    });
  }
}
