'use strict'
const merge = require('webpack-merge')

let mode = process.env.NODE_ENV || 'dev'

const config = {
  development: {
    NODE_ENV: 'development',
    BASE_URL: 'http://localhost/bookstore-ci-backend/',
    API_URL: 'http://localhost/bookstore-ci-backend/api/v1/'
  },
  demo: {
    NODE_ENV: 'demo',
  BASE_URL: 'http://localhost/bookstore-ci-backend/',
    API_URL: 'http://localhost/bookstore-ci-backend/api/v1/'
  },
  production: {
    NODE_ENV: 'production',
    BASE_URL: 'http://localhost/bookstore-ci-backend/',
    API_URL: 'http://localhost/bookstore-ci-backend/api/v1/'
  }
}

module.exports = config[mode]
