import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NOT_FOUND_EXCEPTION } from '../exceptions';
import {
  BountyCollection,
  BountyCollectionDocument,
} from './bountyCollection.schema';

@Injectable()
export class BountyCollectionService {
  constructor(
    @InjectModel(BountyCollection.name)
    private bountyCollection: Model<BountyCollectionDocument>,
  ) {}

  /**
   * Get a guild by id
   * @param id
   * @throws NotFoundException
   */
  async getById(id: string): Promise<BountyCollection> {
    const contract = await this.bountyCollection.findById(id).exec();

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
  ): Promise<{ total: number; data: BountyCollection[] }> {
    const skip = (page - 1) * limit;

    const contracts = await this.bountyCollection
      .find()
      .skip(skip)
      .limit(limit)
      .exec();
    const total = await this.bountyCollection.countDocuments().exec();

    return { total, data: contracts };
  }
}
