// Tipos para usuarios
export interface User {
  id: string
  name: string
  email: string
  emailVerified?: Date
  image?: string
  phone?: string
  location?: {
    province: string
    municipality: string
  }
  bio?: string
  reputation: number // 0-5 estrellas
  totalProperties: number
  totalTransactions: number
  isVerified: boolean
  verificationBadge?: 'bronze' | 'silver' | 'gold' | 'platinum'
  role: 'user' | 'admin' | 'moderator'
  createdAt: Date
  updatedAt: Date
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'system'
  language: 'es' | 'en'
  currency: 'USD' | 'CUP' | 'EUR' | 'MLC'
  notifications: {
    email: boolean
    push: boolean
    sms: boolean
  }
}

// Tipos para autenticación
export interface AuthSession {
  user: User
  expires: Date
}

export interface AuthCredentials {
  email: string
  password: string
  name?: string
  phone?: string
}
