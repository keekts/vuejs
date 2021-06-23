'use strict'
const merge = require('webpack-merge')

let mode = process.env.NODE_ENV || 'dev'

const config = {
  development: {
    NODE_ENV: 'development',
    BASE_URL: 'http://localhost:8000/',
    API_URL: 'http://localhost:8000/api/v1/'
  },
  demo: {
    NODE_ENV: 'demo',
    BASE_URL: 'http://192.168.2.72:8888/bookstore-ci/',
    API_URL: 'http://192.168.2.72:8888/bookstore-ci/api/v1/'
  },
  production: {
    NODE_ENV: 'production',
    BASE_URL: 'http://192.168.2.72:8888/bookstore-ci/',
    API_URL: 'http://192.168.2.72:8888/bookstore-ci/api/v1/'
  }
}

module.exports = config[mode]
