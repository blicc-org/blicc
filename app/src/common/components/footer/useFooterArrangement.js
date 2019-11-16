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
          title: 'OpenAPI 3.0 docs',
          link: 'https://api.blicc.org',
        },
      ],
    },
    {
      category: content.sidebar.about,
      items: [
        {
          title: 'Docs',
          link: '/pages/docs',
        },
        {
          title: content.sidebar.imprint,
          link: '/pages/imprint',
        },
      ],
    },
  ]
}
