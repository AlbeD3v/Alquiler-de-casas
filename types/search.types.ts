// Tipos para búsqueda
export interface SearchParams {
  query?: string
  location?: string
  minPrice?: number
  maxPrice?: number
  bedrooms?: number
  bathrooms?: number
  propertyType?: string
  transactionType?: 'alquiler' | 'venta' | 'compra'
  sortBy?: 'price_asc' | 'price_desc' | 'date_desc' | 'date_asc' | 'relevance'
  page?: number
  limit?: number
}

export interface SearchResult<T> {
  data: T[]
  total: number
  page: number
  limit: number
  totalPages: number
  hasMore: boolean
}

export interface SearchState {
  params: SearchParams
  results: SearchResult<any> | null
  isLoading: boolean
  error: Error | null
}
