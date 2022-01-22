if (process.env.NODE_ENV === 'development') {
  const Mock = require('mockjs2')

  require('./services/login')

  Mock.setup(500)
}
