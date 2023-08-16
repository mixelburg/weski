import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { joinUrl } from '@weski/util'
import {HealthCheckResponse, QueryHotelsResponse, RequestHotelsBatch, SkiQuery} from '@weski/types';

const baseUrl = import.meta.env.VITE_API_URL || 'https://127.0.0.1:3000'

function dateReviver(key: string, value: any) {
  // This regex matches date strings in the format: YYYY-MM-DDTHH:mm:ss.sssZ
  const datePattern = /^(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d*)?Z)$/

  if (typeof value === 'string' && datePattern.test(value)) {
    return new Date(value)
  }

  return value
}

const axiosConfig: AxiosRequestConfig = {
  baseURL: joinUrl(baseUrl, 'api/'),
  withCredentials: true,
  transformResponse: (data: any) => {
    if (typeof data === 'string') {
      try {
        return JSON.parse(data, dateReviver)
      } catch (e) {
        return data
      }
    }
    return data
  },
}
const axiosInstance = axios.create(axiosConfig)


const apiService = {
  health: async (): Promise<HealthCheckResponse> => (await axiosInstance.get('health')).data,
  queryHotels: async (data: SkiQuery): Promise<QueryHotelsResponse> => (await axiosInstance.post('', data)).data,
  getBatch: async (id: string): Promise<RequestHotelsBatch> => (await axiosInstance.get(id)).data,
}

export default apiService
