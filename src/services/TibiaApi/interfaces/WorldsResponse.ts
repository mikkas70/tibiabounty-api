import { ITibiaApiResponse } from './TibiaApiResponse';
import { IWorld } from './World';

export interface IWorldsResponse extends ITibiaApiResponse {
  players_online: number;
  record_players: number;
  record_date: Date;
  worlds: {
    regular_worlds: IWorld[];
  };
}
