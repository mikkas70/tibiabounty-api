import { ITibiaApiResponse } from './TibiaApiResponse';
import { IGuild } from './IGuild';

export interface IGuildsResponse extends ITibiaApiResponse {
  guilds: {
    active: IGuild[];
    formation?: IGuild[];
  };
}
