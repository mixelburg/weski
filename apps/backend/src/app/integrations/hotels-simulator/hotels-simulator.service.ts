import { Injectable } from '@nestjs/common';
import axios, {AxiosInstance} from "axios";
import { ApiIntegration } from '../integration.interface';
import {ConfigService} from "@nestjs/config";
import {SkiHotel, SkiImage, SkiQuery, SkiQueryIntegrationResult} from "@weski/types";

@Injectable()
export class HotelsSimulatorService extends ApiIntegration {
  axiosInstance: AxiosInstance;
  constructor(
    private readonly config: ConfigService
  ) {
    super()
    this.axiosInstance = axios.create({
      baseURL: config.get('HOTELS_SIMULATOR_URL')
    })
  }

  async _findHotels(query: SkiQuery): Promise<SkiQueryIntegrationResult> {
    const res = (await this.axiosInstance.post('', {
      query: {
        ski_site: query.site,
        from_date: new Date(query.fromDate).toLocaleDateString('en-GB', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric'
        }),
        to_date: new Date(query.toDate).toLocaleDateString('en-GB', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric'
        }),
        group_size: query.groupSize
      }
    })).data

    const hotels: SkiHotel[] = res.body?.accommodations?.map((val) => ({
      code: val.HotelCode,
      name: val.HotelName,
      images: val.HotelDescriptiveContent.Images.map(v => ({
        url: v.URL,
        isMain: v.MainImage === 'True'
      }) satisfies SkiImage),
      info: {
        position: {
          latitude: parseFloat(val.HotelInfo.Position.Latitude),
          longitude: parseFloat(val.HotelInfo.Position.Longitude),
        },
        rating: parseFloat(val.HotelInfo.Rating),
        beds: parseInt(val.HotelInfo.Beds)
      },
      price: {
        beforeTax: parseFloat(val.PricesInfo.AmountBeforeTax),
        afterTax: parseFloat(val.PricesInfo.AmountAfterTax)
      },
    }) satisfies SkiHotel) || []

    return {
      hotels,
    }
  }

  async* findHotels(query: SkiQuery): AsyncGenerator<SkiQueryIntegrationResult> {
    for (let groupSize = query.groupSize; groupSize < Math.max(query.groupSize * 2, 5); groupSize++) {
      yield await this._findHotels({
        ...query,
        groupSize
      })
    }
  }
}
