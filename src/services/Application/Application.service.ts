import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';

@Injectable()
export class ApplicationService implements OnApplicationBootstrap {
  private readonly logger = new Logger(ApplicationService.name);

  constructor() {}

  async onApplicationBootstrap() {
    this.logger.debug('TODO - Application fetching critical data...');
  }
}
