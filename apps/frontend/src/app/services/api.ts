import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { joinUrl } from '@weski/util'
import { HealthCheckResponse } from '@weski/types';

const baseUrl = import.meta.env.VITE_API_URL

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
}

export default apiService
