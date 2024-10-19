import { DataFactory, Seeder } from 'nestjs-seeder';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BountyContract } from './bountyContract.schema';
import { Character } from '../Character/character.schema';

@Injectable()
export class BountyContractSeeder implements Seeder {
  constructor(
    @InjectModel(BountyContract.name)
    private readonly bountyContract: Model<BountyContract>,
    @InjectModel(Character.name)
    private readonly character: Model<Character>,
  ) {}

  async seed(): Promise<void> {
    const bountyContracts =
      DataFactory.createForClass(BountyContract).generate(30);

    await Promise.all(
      bountyContracts.map(async (bountyContract) => {
        const requester = await this.character.findOne().exec();
        const target = await this.character
          .findOne({ level: { $gte: 150 }, _id: { $ne: requester._id } })
          .exec();

        await this.bountyContract.create({
          ...bountyContract,
          requester_character: requester,
          target_character: target,
        });
      }),
    );
  }

  drop(): Promise<any> {
    return this.bountyContract.deleteMany({});
  }
}
