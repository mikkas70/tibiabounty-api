import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NOT_FOUND_EXCEPTION } from '../exceptions';
import {
  BountyCollectionParticipant,
  BountyCollectionParticipantDocument,
} from './bountyCollectionParticipant.schema';

@Injectable()
export class BountyCollectionParticipantService {
  constructor(
    @InjectModel(BountyCollectionParticipant.name)
    private bountyCollectionParticipant: Model<BountyCollectionParticipantDocument>,
  ) {}

  /**
   * Get a guild by id
   * @param id
   * @throws NotFoundException
   */
  async getById(id: string): Promise<BountyCollectionParticipant> {
    const contract = await this.bountyCollectionParticipant.findById(id).exec();

    if (!contract) {
      throw new NotFoundException(NOT_FOUND_EXCEPTION);
    }

    return contract;
  }

  /**
   * List bounties by pagination.
   * @param page
   * @param limit
   */
  async list(
    page: number,
    limit: number,
  ): Promise<{ total: number; data: BountyCollectionParticipant[] }> {
    const skip = (page - 1) * limit;

    const contracts = await this.bountyCollectionParticipant
      .find()
      .skip(skip)
      .limit(limit)
      .exec();

    const total = await this.bountyCollectionParticipant
      .countDocuments()
      .exec();

    return { total, data: contracts };
  }
}
