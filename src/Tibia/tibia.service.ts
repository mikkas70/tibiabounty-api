import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { catchError, map } from 'rxjs/operators';
import { firstValueFrom, throwError } from 'rxjs';
import { IWorldsResponse } from './interfaces/WorldsResponse';
import { IWorld } from './interfaces/World';
import { ICharacter } from './interfaces/Character';
import { ICharacterResponse } from './interfaces/CharacterResponse';
import { IGuild } from './interfaces/IGuild';
import { IGuildsResponse } from './interfaces/GuildsResponse';

@Injectable()
export class TibiaService {
  private readonly API_URL = 'https://api.tibiadata.com/v4/';

  constructor(private readonly httpService: HttpService) {}

  /**
   * Fetches information about a character from Tibia API
   * @param name
   */
  async character(name: string): Promise<ICharacter> {
    const character = this.httpService
      .get<ICharacterResponse>(this.API_URL + 'character/' + encodeURI(name))
      .pipe(
        map((response) => response.data.character),
        catchError((error) => {
          console.error('Error fetching character data:', error);
          return throwError(() => new Error('Failed to fetch character data'));
        }),
      );

    return await firstValueFrom(character);
  }

  /**
   * Fetches information about all worlds from Tibia API
   * @returns Observable with the worlds information
   */
  async worlds(): Promise<IWorld[]> {
    const worlds = this.httpService
      .get<IWorldsResponse>(this.API_URL + 'worlds')
      .pipe(
        map((response) => response.data.worlds.regular_worlds),
        catchError((error) => {
          console.error('Error fetching worlds data:', error);
          return throwError(() => new Error('Failed to fetch worlds data'));
        }),
      );

    return await firstValueFrom(worlds);
  }

  /**
   * Fetches information about all guilds from a specific world from Tibia API
   * @param world
   */
  async guilds(world: string): Promise<IGuild[]> {
    const worlds = this.httpService
      .get<IGuildsResponse>(this.API_URL + 'guilds/' + world)
      .pipe(
        map((response) => [
          ...(response.data.guilds.active ?? []),
          ...(response.data.guilds.formation ?? []),
        ]),
        catchError((error) => {
          console.error('Error fetching worlds data:', error);
          return throwError(() => new Error('Failed to fetch worlds data'));
        }),
      );

    return await firstValueFrom(worlds);
  }
}
