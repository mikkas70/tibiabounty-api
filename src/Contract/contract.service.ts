import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NOT_FOUND_EXCEPTION } from '../exceptions';
import { Contract, ContractDocument } from './contract.schema';
import { TibiaService } from '../Tibia/tibia.service';
import { CharacterService } from '../Character/character.service';

@Injectable()
export class ContractService {
  constructor(
    @InjectModel(Contract.name)
    private contract: Model<ContractDocument>,
    private readonly tibiaService: TibiaService,
    private readonly characterService: CharacterService,
  ) {}

  /**
   * Get a guild by id
   * @param id
   * @throws NotFoundException
   */
  async getById(id: string): Promise<Contract> {
    const contract = await this.contract.findById(id).exec();

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
  ): Promise<{ total: number; data: Contract[] }> {
    const skip = (page - 1) * limit;

    const contracts = await this.contract.find().skip(skip).limit(limit).exec();
    const total = await this.contract.countDocuments().exec();

    return { total, data: contracts };
  }
}
