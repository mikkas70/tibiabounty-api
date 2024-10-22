import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NOT_FOUND_EXCEPTION } from '../exceptions';
import { Bounty, BountyDocument } from './bounty.schema';
import { BountyStatus } from './enums/bountyStatus';
import { CreateBountyDto } from './dto/createBountyDto';

@Injectable()
export class BountyService {
  constructor(
    @InjectModel(Bounty.name) private bounty: Model<BountyDocument>,
  ) {}

  /**
   * Create a new bounty.
   * @param data
   */
  async create(data: CreateBountyDto): Promise<Bounty> {
    const bounty = new this.bounty();

    bounty.target_character = data.target_character;
    bounty.requester_character = data.requester_character;
    bounty.value = data.value;
    bounty.status = BountyStatus.ACTIVE;
    bounty.expires_at = data.expires_at;

    return bounty.save();
  }

  /**
   * Update the status of a bounty.
   * @param id
   * @param status
   */
  async setStatus(id: string, status: BountyStatus): Promise<Bounty> {
    const bounty = await this.bounty
      .findByIdAndUpdate(id, { $set: { status } }, { new: true })
      .exec();

    if (!bounty) {
      throw new NotFoundException('Bounty not found');
    }

    return bounty;
  }

  /**
   * Update the value of a bounty.
   * @param id
   * @param value
   */
  async setValue(id: string, value: number): Promise<Bounty> {
    const bounty = await this.bounty
      .findByIdAndUpdate(id, { $set: { value } }, { new: true })
      .exec();

    if (!bounty) {
      throw new NotFoundException('Bounty not found');
    }

    return bounty;
  }

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
   * Get expired bounties that are currently active.
   */
  async getExpirable(): Promise<Bounty[]> {
    return this.bounty
      .find({
        expires_at: { $lt: new Date() },
        status: { $eq: BountyStatus.ACTIVE },
      })
      .exec();
  }

  /**
   * List bounties by pagination.
   * @param page
   * @param limit
   */
  async getAll(
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
    // TODO
  }

  async getActiveForCharacter(character_id: string): Promise<Bounty> {
    return await this.bounty
      .findOne({
        status: BountyStatus.ACTIVE,
        target_character: character_id,
      })
      .exec();
  }
}
