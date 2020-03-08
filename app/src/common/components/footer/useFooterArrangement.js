import { useLanguage } from '../../hooks'

export function useFooterArrangement() {
  const content = useLanguage()
  return [
    {
      category: content.sidebar.navigation,
      items: [
        {
          title: content.sidebar.register,
          link: '/register',
        },
        {
          title: content.sidebar.landingPage,
          link: '/',
        },
      ],
    },
    {
      category: content.sidebar.development,
      items: [
        {
          title: 'Github',
          link: 'https://github.com/blicc-org/blicc',
        },
        {
          title: 'Plugin Development',
          link: 'https://github.com/blicc-org/plugins',
        },
        {
          title: 'Resource Management API',
          link: 'https://api.blicc.org',
        },
        {
          title: 'Data Delivery API',
          link: 'https://delivery.blicc.org',
        },
      ],
    },
    {
      category: content.sidebar.about,
      items: [
        {
          title: content.sidebar.manual,
          link: '/pages/manual',
        },
        {
          title: content.sidebar.imprint,
          link: '/pages/imprint',
        },
      ],
    },
  ]
}
