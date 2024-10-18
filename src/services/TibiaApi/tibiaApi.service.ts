import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { catchError, map } from 'rxjs/operators';
import { firstValueFrom, throwError } from 'rxjs';
import { TIBIA_API_URL } from './constants';
import { IWorldsResponse } from './interfaces/WorldsResponse';
import { IWorld } from './interfaces/World';
import { ICharacter } from './interfaces/Character';
import { ICharacterResponse } from './interfaces/CharacterResponse';

@Injectable()
export class TibiaApiService {
  private readonly tibiaApiUrl = 'https://api.tibiadata.com/v3/worlds';

  constructor(private readonly httpService: HttpService) {}

  async character(name: string): Promise<ICharacter> {
    const character = this.httpService
      .get<ICharacterResponse>(TIBIA_API_URL + 'character/' + encodeURI(name))
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
      .get<IWorldsResponse>(`${TIBIA_API_URL}/worlds`)
      .pipe(
        map((response) => response.data.worlds.regular_worlds),
        catchError((error) => {
          console.error('Error fetching worlds data:', error);
          return throwError(() => new Error('Failed to fetch worlds data'));
        }),
      );

    return await firstValueFrom(worlds);
  }
}
