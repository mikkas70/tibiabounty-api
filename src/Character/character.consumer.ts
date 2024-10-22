import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { CharacterService } from './character.service';
import { TibiaService } from '../Tibia/tibia.service';
import { Logger } from '@nestjs/common';
import { WorldService } from '../World/world.service';
import { GuildService } from '../Guild/guild.service';
import { BountyService } from '../Bounty/bounty.service';

@Processor('character', { concurrency: 5 })
export class CharacterConsumer extends WorkerHost {
  private logger = new Logger(CharacterConsumer.name);

  constructor(
    private readonly characterService: CharacterService,
    private readonly guildService: GuildService,
    private readonly worldService: WorldService,
    private readonly tibiaService: TibiaService,
    private readonly bountyService: BountyService,
  ) {
    super();
  }

  async process(job: Job<{ id: string }>): Promise<any> {
    const character = await this.characterService.getById(job.data.id);

    await this.tibiaService.character(character.name).then(async (data) => {
      let guild = undefined;

      const world = await this.worldService.getByName(data.character.world);

      const character = await this.characterService.getByName(
        data.character.name,
      );

      if (data.character.guild?.name) {
        guild = await this.guildService.getByName(
          data.character.guild.name,
          world,
        );
      }

      const onlineStatusCharacter = data.other_characters.findIndex(
        (otherCharacter) => otherCharacter.name === character.name,
      );

      await this.characterService.update(character._id, {
        world: world,
        guild: guild,
        guild_rank: data.character.guild?.rank,
        level: data.character.level,
        vocation: data.character.vocation,
        is_online:
          data.other_characters[onlineStatusCharacter].status === 'online',
      });
    });
  }
}
