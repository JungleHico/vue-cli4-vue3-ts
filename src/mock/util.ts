import jwt from 'jsonwebtoken'

// 构建返回数据
export const builder = (data = {}, message: string, code = 0, headers = {}) => {
  const response = {
    message: message || '',
    timestamp: new Date().getTime(),
    data,
    code: 0,
    _status: 0,
    headers
  }
  if (code) {
    response.code = code
    response._status = code
  }
  if (headers && typeof headers === 'object' && Object.keys(headers).length > 0) {
    response.headers = headers
  }
  return response
}

// 获取请求体(post)
export const getBody = (options: any) => {
  return options.body ? JSON.parse(options.body) : {}
}

// token 生成和校验
export const Token = {
  sign (data = {}, time: string) {
    return jwt.sign(data, 'token', { expiresIn: time })
  },
  async verify (authorization: string) {
    try {
      if (authorization && authorization.includes('Bearer')) {
        const token = authorization.replace('Bearer ', '')
        const data = jwt.verify(token, 'token')
        return data
      } else {
        return Promise.reject(new Error('invalid token'))
      }
    } catch (error) {
      return Promise.reject(error)
    }
  }
}
