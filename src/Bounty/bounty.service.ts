import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  CHARACTER_ELIGIBILITY_LEVEL_TOO_LOW_EXCEPTION,
  NOT_FOUND_EXCEPTION,
} from '../exceptions';
import { Bounty, BountyDocument } from './bounty.schema';
import { TibiaService } from '../Tibia/tibia.service';
import { CharacterService } from '../Character/character.service';

@Injectable()
export class BountyService {
  constructor(
    @InjectModel(Bounty.name) private bounty: Model<BountyDocument>,
    private readonly tibiaService: TibiaService,
    private readonly characterService: CharacterService,
  ) {}

  /**
   * Get a guild by id
   * @param id
   * @throws NotFoundException
   */
  async getById(id: string): Promise<Bounty> {
    const bounty = await this.bounty.findById(id).exec();

    if (!bounty) {
      throw new NotFoundException(NOT_FOUND_EXCEPTION);
    }

    return bounty;
  }

  /**
   * List bounties by pagination.
   * @param page
   * @param limit
   */
  async list(
    page: number,
    limit: number,
  ): Promise<{ total: number; data: Bounty[] }> {
    const skip = (page - 1) * limit;

    const bounties = await this.bounty.find().skip(skip).limit(limit).exec();
    const total = await this.bounty.countDocuments().exec();

    return { total, data: bounties };
  }

  /**
   * Check if a character is eligible for a bounty. Rules:
   * - Character must be of level 150 or higher.
   * - There must be no recent bounties that resulted in death (2 days cooldown?)
   * @param name
   * @throws
   */
  async checkEligibility(name: string): Promise<void> {
    const { character } = await this.tibiaService.character(name);

    if (character.level < 150) {
      throw new HttpException(
        CHARACTER_ELIGIBILITY_LEVEL_TOO_LOW_EXCEPTION,
        400,
      );
    }

    try {
      const character = this.characterService.getByName(name);
      // TODO - Check if there are previous recent bounties.
    } catch {}
  }
}