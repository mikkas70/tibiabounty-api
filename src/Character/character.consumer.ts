import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { CharacterService } from './character.service';
import { TibiaService } from '../Tibia/tibia.service';

@Processor('character', { concurrency: 5 })
export class CharacterConsumer extends WorkerHost {
  constructor(
    private readonly characterService: CharacterService,
    private readonly tibiaService: TibiaService,
  ) {
    super();
  }

  async process(job: Job<{ id: string }>): Promise<any> {
    const character = await this.characterService.getById(job.data.id);

    await this.tibiaService.character(character.name).then((data) => {
      console.log('done - ' + character.name);
    });
  }
}
