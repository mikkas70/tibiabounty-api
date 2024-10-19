import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NOT_FOUND_EXCEPTION } from '../exceptions';
import {
  BountyContract,
  BountyContractDocument,
} from './bountyContract.schema';

@Injectable()
export class BountyContractService {
  constructor(
    @InjectModel(BountyContract.name)
    private bountyContract: Model<BountyContractDocument>,
  ) {}

  /**
   * Get a guild by id
   * @param id
   * @throws NotFoundException
   */
  async getById(id: string): Promise<BountyContract> {
    const contract = await this.bountyContract.findById(id).exec();

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
  ): Promise<{ total: number; data: BountyContract[] }> {
    const skip = (page - 1) * limit;

    const contracts = await this.bountyContract
      .find()
      .skip(skip)
      .limit(limit)
      .exec();
    const total = await this.bountyContract.countDocuments().exec();

    return { total, data: contracts };
  }
}
