import { Injectable } from '@nestjs/common'
import { APP_VERSION } from '@weski/config';
import { HealthCheckResponse } from '@weski/types';

@Injectable()
export class AppService {
  async health(): Promise<HealthCheckResponse> {
    return {
      version: APP_VERSION,
      database: { ok: true },
    }
  }
}
