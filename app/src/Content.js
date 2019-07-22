const content = {
  metadata: {
    title: 'blicc.org',
    description:
      'Visualize your process data with customizable dashboards.',
    copyright: 'Open Source MIT license',
  },
  pages: {
    notFound: {
      title: 'Page not found!',
    },
  },
  footerNavigation: [
    {
      category: 'Navigation',
      items: [
        {
          title: 'Dasboard',
          link: '/dashboard',
        },
        {
          title: 'Login',
          link: '/login',
        },
        {
          title: 'Landing Page',
          link: '/',
        },
      ],
    },
    {
      category: 'Community',
      items: [
        {
          title: 'Github',
          link: 'https://github.com/blicc-org/blicc',
        },
      ],
    },
    {
      category: 'Support',
      items: [
        {
          title: 'Api Documentation',
          link: 'https://api.blicc.org/docs',
        },
      ],
    },
  ],
}

export default content
