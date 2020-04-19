const isDev: boolean = process.env.NODE_ENV === 'development'

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

// bootstrap breakpoints
export const breakpoints: any = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
}

export const sidebarWidth = 232
export const navbarHight = 40

export const languages: any = {
  en: 'English',
  de: 'Deutsch',
}

export const ANDROID_APP_STORE_LINK =
  'https://play.google.com/store/apps/details?id=com.blicc.app'

export const EXAMPLE_DATA = {
  labels: ['Label 1', 'Label 2', 'Label 3'],
  datasets: [
    {
      label: 'Dataset 1',
      data: [72.2, 68.8, 59.1],
    },
    {
      label: 'Dataset 2',
      data: [29.4, 29.2, 29.5],
    },
    {
      label: 'Dataset 3',
      data: [100, 100, 100],
    },
    {
      label: 'Dataset 4',
      data: [21.2, 20.1, 17.4],
    },
  ],
}
