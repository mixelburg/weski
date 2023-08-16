import {BadRequestException, Injectable} from '@nestjs/common'
import { APP_VERSION } from '@weski/config';
import {
  HealthCheckResponse,
  QueryHotelsRequest,
  RequestHotelsBatch,
  QueryHotelsResponse,
  SkiHotel,
  SkiQuery
} from '@weski/types';
import {HotelsSimulatorService} from "./integrations/hotels-simulator/hotels-simulator.service";
import {generateId} from "@weski/util";
import logger from "../logger";



@Injectable()
export class AppService {
  requests: QueryHotelsRequest[] = [];
  constructor(
    private readonly hotelsSimulatorService: HotelsSimulatorService,
  ) {
  }

  async health(): Promise<HealthCheckResponse> {
    return {
      version: APP_VERSION,
      database: { ok: true },
    }
  }

  async processRequest(id: string, query: SkiQuery) {
    const services = [
      this.hotelsSimulatorService
    ]

    await Promise.all(services.map(async (service) => {
      try {
        for await (const batch of service.findHotels(query)) {
          const request = this.requests.find(r => r.id === id)
          if (request) {
            request.results = [...request.results, ...batch.hotels]
          }
        }
      } catch (e) {
        console.error('error processing request', e)
      }
    }))
    const request = this.requests.find(r => r.id === id)
    if (request) {
      request.fulfilled = true
    }
  }

  async getRequest(id: string): Promise<RequestHotelsBatch> {
    const request = this.requests.find(r => r.id === id)
    if (!request) {
      return {
        id,
        results: [],
        fulfilled: true
      }
    }
    // remove fulfilled requests
    if (request.fulfilled) {
      this.requests = this.requests.filter(r => r.id !== id)
    }
    return {
      id,
      results: request.results,
      fulfilled: request.fulfilled
    }
  }

  async queryHotels(query: SkiQuery): Promise<QueryHotelsResponse> {
    const id = generateId()

    const request: QueryHotelsRequest = {
      query,
      id,
      results: [],
      fulfilled: false
    }
    this.requests.push(request)

    this.processRequest(id, query).catch((e) => {
      console.error(e)
      logger.error('error processing request', e)
    })

    return {
      id
    }
  }
}
