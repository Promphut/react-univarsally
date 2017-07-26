const merge = require('lodash/merge');

// const browser = typeof window !== 'undefined'
// const ip = process.env.IP || '0.0.0.0'
// const port = process.env.PORT || 3000

const config = {
  all: {
    env: process.env.NODE_ENV || 'development',
    isDev: process.env.NODE_ENV === 'development',
    basename: process.env.PUBLIC_PATH,
    isBrowser: typeof window !== 'undefined',
    isServer: typeof window === 'undefined',
    host: process.env.HOST || 'localhost',
    port: process.env.PORT || 3000,

    FROMDATE: '20170610',
    PID: '12',
    NAME: 'aomMONEY', // one word, no space
    FACEBOOK: 'aommoneyth',
    FEED_LIMIT: 15,
    FEED_LIMIT_MOBILE: 5,
    ROLES: {
      MEMBER: 0,
      EDITOR: 1,
      WRITER: 2,
      ADMIN: 3,
    },
    ANALYTIC: {
      FBAPPID: '125839547999656',
      TAGMGRID: 'GTM-K2QX6KZ',
      CHARTBEATUID: 65098,
      QUANTCASTACC: 'p-uSc6wXBs-FJmv',
      BITLY: '45602029bdf37773b3c3887a281ed9b7e13c5622', // infographicthailand
    },
    amazonAccessKey: 'AKIAJKZV2MRFEBXGXVTQ',
    secretKey: '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',
  },
  development: {
    ANALYTIC: {
      FBAPPID: '1946012919021035',
    },
    DOMAIN: 'localhost',
    FRONTURL: 'http://localhost:3000',
    BACKURL: 'https://localhost:4000',
    COVER: 'https://localhost:3000/pic/fbthumbnail.jpg',
  },
  production: {
    DOMAIN: 'aommoney.com',
    FRONTURL: 'https://aommoney.com',
    BACKURL: 'https://api.thesolar.co',
    COVER: 'https://aommoney.com/pic/fbthumbnail.jpg',
  },
  staging: {
    DOMAIN: 'staging.aommoney.com',
    FRONTURL: 'https://staging.aommoney.com',
    BACKURL: 'https://staging.thesolar.co',
    COVER: 'https://staging.aommoney.com/pic/fbthumbnail.jpg',
  },
};

module.exports = merge(config.all, config[config.all.env]);
