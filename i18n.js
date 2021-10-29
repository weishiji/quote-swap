module.exports = {
  locales: ['en'],
  defaultLocale: 'en',
  logBuild: process.env.NODE_ENV === 'development',
  localeDetection: false,
  pages: {
    '*': ['common'],
    '/about/cookie-policy': ['cookie-policy'],
    '/about/privacy-policy': ['privacy-policy'],
    '/about/terms-of-use': ['terms'],
    '/about/team': ['team'],
    '/about/company': ['about'],
    '/service/request-for-quote': ['rfq'],
    '/service/portfolio-management-system': ['pms'],
    '/service/direct-market-access-with-algo-trading': ['trading'],
    '/newsroom': ['news'],
  },
};
