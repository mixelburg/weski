export type SkiQuery = {
  site: number,
  fromDate: Date,
  toDate: Date,
  groupSize: number
}

export type SkiImage = {
  url: string,
  isMain: boolean
}


export type SkiHotel = {
  code: string,
  name: string,
  images: SkiImage[],
  info: {
    position: {
      latitude: number,
      longitude: number
    },
    rating: number,
    beds: number,
  }
  price: {
    beforeTax: number,
    afterTax: number
  }
}

export type SkiQueryIntegrationResult = {
  hotels: SkiHotel[]
}


export type QueryHotelsResponse = {
  id: string,
}

export type QueryHotelsRequest = {
  query: SkiQuery,
  id: string
  results: SkiHotel[]
  fulfilled: boolean
}

export type RequestHotelsBatch = {
  id: string
  results: SkiHotel[]
  fulfilled: boolean
}

export const skiSiteOptions = [
  {
    id: 1,
    name: 'Val Thorens'
  },
  {
    id: 2,
    name: 'Courchevel'
  },
  {
    id: 3,
    name: 'Tignes'
  },
  {
    id: 4,
    name: 'La Plagne'
  },
  {
    id: 5,
    name: 'Chamonix'
  }
]
