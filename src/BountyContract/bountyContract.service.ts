import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  BOUNTY_NOT_UPDATED_SUCCESSFULLY,
  NOT_FOUND_EXCEPTION,
} from '../exceptions';
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
   * Get contracts that are ready for execution (paid, not yet active)
   * @return BountyContract[]
   */
  async getReadyForExecution(): Promise<BountyContract[]> {
    return await this.bountyContract
      .find({
        bounty: { $eq: null },
        is_paid: true,
        is_returned: false,
      })
      .exec();
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

  async assignBounty(id: string, bountyId: string): Promise<void> {
    const result = await this.bountyContract
      .findByIdAndUpdate(id, { bounty: bountyId })
      .exec();

    if (!result) {
      throw new HttpException(BOUNTY_NOT_UPDATED_SUCCESSFULLY, 500);
    }
  }
}
