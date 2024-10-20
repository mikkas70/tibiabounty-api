import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NOT_FOUND_EXCEPTION } from '../exceptions';
import {
  BountyCollector,
  BountyCollectorDocument,
} from './bountyCollector.schema';

@Injectable()
export class BountyCollectorService {
  constructor(
    @InjectModel(BountyCollector.name)
    private bountyCollector: Model<BountyCollectorDocument>,
  ) {}

  /**
   * Get a guild by id
   * @param id
   * @throws NotFoundException
   */
  async getById(id: string): Promise<BountyCollector> {
    const contract = await this.bountyCollector.findById(id).exec();

    if (!contract) {
      throw new NotFoundException(NOT_FOUND_EXCEPTION);
    }

    return contract;
  }

  /**
   * Get all unpaid bounty collectors.
   */
  async getUnpaid(): Promise<BountyCollector[]> {
    return this.bountyCollector.find({ paid: false }).exec();
  }

  /**
   * List bounties by pagination.
   * @param page
   * @param limit
   */
  async list(
    page: number,
    limit: number,
  ): Promise<{ total: number; data: BountyCollector[] }> {
    const skip = (page - 1) * limit;

    const contracts = await this.bountyCollector
      .find()
      .skip(skip)
      .limit(limit)
      .exec();

    const total = await this.bountyCollector.countDocuments().exec();

    return { total, data: contracts };
  }
}
