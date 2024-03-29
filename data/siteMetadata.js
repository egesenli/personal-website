const siteMetadata = {
  title: 'Erkan Ege Senli Blog',
  author: 'Erkan Ege Senli',
  headerTitle: 'Erkan Ege Senli',
  description: 'A place where I can express myself',
  language: 'en-us',
  theme: 'system', // System, dark or light
  siteUrl: 'https://egesenli.com',
  siteRepo: 'https://github.com/egesenli/personal-website',
  siteLogo: '/static/images/logo-white.png',
  image: '',
  socialBanner: '',
  email: 'egesenli@gmail.com',
  github: 'https://github.com/egesenli',
  twitter: 'https://twitter.com/egesenli',
  facebook: 'https://facebook.com/ege.senli',
  youtube: 'https://youtube.com',
  linkedin: 'https://www.linkedin.com/in/erkanegesenli/',
  locale: 'en-US',
  analytics: {
    plausibleDataDomain: '', // e.g. tailwind-nextjs-starter-blog.vercel.app
    simpleAnalytics: false, // true or false
    umamiWebsiteId: '', // e.g. 123e4567-e89b-12d3-a456-426614174000
    googleAnalyticsId: '', // e.g. UA-000000-2 or G-XXXXXXX
    posthogAnalyticsId: '', // posthog.init e.g. phc_5yXvArzvRdqtZIsHkEm3Fkkhm3d0bEYUXCaFISzqPSQ
  },
  newsletter: {
    // Supports mailchimp, buttondown, convertkit, klaviyo, revue, emailoctopus
    // Add your .env file and modify it according to your selection
    provider: 'buttondown',
  },
  comment: {
    // For commenting system other than giscus, I have to add it to the content security policy in the `next.config.js` file.
    // Select a provider and use the environment variables associated to it
    // https://vercel.com/docs/environment-variables
    provider: 'giscus', // Supported providers: giscus, utterances, disqus
    giscusConfig: {
      // Visit the link below, and follow the steps in the 'configuration' section
      // https://giscus.app/
      repo: process.env.NEXT_PUBLIC_GISCUS_REPO,
      repositoryId: process.env.NEXT_PUBLIC_GISCUS_REPOSITORY_ID,
      category: process.env.NEXT_PUBLIC_GISCUS_CATEGORY,
      categoryId: process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID,
      mapping: 'pathname', // Supported options: pathname, url, title
      reactions: '1', // Emoji reactions: 1 = enable / 0 = disable
      // Send discussion metadata periodically to the parent window: 1 = enable / 0 = disable
      metadata: '0',
      // theme example: light, dark, dark_dimmed, dark_high_contrast
      // transparent_dark, preferred_color_scheme, custom
      theme: 'light',
      // Place the comment box above the comments. options: bottom, top
      inputPosition: 'bottom',
      // Choose the language giscus will be displayed in. options: en, es, zh-CN, zh-TW, ko, ja etc
      lang: 'en',
      // Theme when dark mode
      darkTheme: 'transparent_dark',
      // If the theme option above is set to 'custom`, provide a link below to your custom theme css file.
      // Example: https://giscus.app/themes/custom_example.css
      themeURL: '',
    },
    utterancesConfig: {
      // Visit the link below, and follow the steps in the 'configuration' section
      // https://utteranc.es/
      repo: process.env.NEXT_PUBLIC_UTTERANCES_REPO,
      issueTerm: '', // supported options: pathname, url, title
      label: '', // label (optional): Comment 💬
      // theme example: github-light, github-dark, preferred-color-scheme
      // github-dark-orange, icy-dark, dark-blue, photon-dark, boxy-light
      theme: '',
      // theme when dark mode
      darkTheme: '',
    },
    disqusConfig: {
      // https://help.disqus.com/en/articles/1717111-what-s-a-shortname
      shortname: process.env.NEXT_PUBLIC_DISQUS_SHORTNAME,
    },
  },
}

module.exports = siteMetadata
