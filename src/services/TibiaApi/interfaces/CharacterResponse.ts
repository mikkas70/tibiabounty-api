import { ITibiaApiResponse } from './TibiaApiResponse';
import { ICharacter } from './Character';

export interface ICharacterResponse extends ITibiaApiResponse {
  character: ICharacter;
}
