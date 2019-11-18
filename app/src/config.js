const isDev = process.env.NODE_ENV === 'development'

export const API = {
  ORIGIN: isDev ? 'http://localhost' : 'https://api.blicc.org',
  HOST: isDev ? 'localhost' : 'api.blicc.org',
}

export const APP = {
  ORIGIN: isDev ? 'http://localhost:3000' : 'https://blicc.org',
}

export const DELIVERY = {
  ORIGIN: isDev ? 'ws://localhost:8080' : 'wss://delivery.blicc.org',
}

// same grid breakpoints as bootstrap
export const breakpoints = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
}

export const sidebarWidth = 232
export const navbarHight = 40

export const languages = {
  en: 'English',
  de: 'Deutsch',
}
