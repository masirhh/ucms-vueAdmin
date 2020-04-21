import axios from 'axios'


export function reqUser(config) {
  // 创建axios实例
  const instance = axios.create({
    baseURL: 'http://localhost:18081/ucms/user',
    timeout: 5000
  })
  // 设置拦截器，拦截结果只需要data
  instance.interceptors.response.use(res => {
    return res.data.data
  }, err => {
    err.message = 'Response Error!'
    return err
  })
  return instance(config)
}

export function reqClub(config) {
  const instance = axios.create({
    baseURL: 'http://localhost:18081/ucms/club',
    timeout: 5000
  })
  instance.interceptors.response.use(res => {
    return res.data.data
  }, err => {
    err.message = 'Response Error!'
    return err
  })
  return instance(config)

}

export function reqJoin(config) {
  const instance = axios.create({
    baseURL: 'http://localhost:18081/ucms/join',
    timeout: 5000
  })
  instance.interceptors.response.use(res => {
    return res.data.data
  }, err => {
    err.message = 'Response Error!'
    return err
  })
  return instance(config)

}

export function reqLoginUser(config) {
  const instance = axios.create({
    baseURL: 'http://localhost:18081/ucms/redis/getUser',
    timeout: 5000
  })
  instance.interceptors.response.use(res => {
    return res.data.data
  }, err => {
    err.message = 'Response Error!'
    return err
  })
  return instance(config)
}

export function reqActivities(config) {
  const instance = axios.create({
    baseURL: 'http://localhost:18081/ucms/activity',
    timeout: 5000
  })
  instance.interceptors.response.use(res => {
    return res.data.data
  }, err => {
    err.message = 'Response Error!'
    return err
  })
  return instance(config)
}

export function reqArticle(config) {
  const instance = axios.create({
    baseURL: 'http://localhost:18081/ucms/article',
    timeout: 5000
  })
  instance.interceptors.response.use(res => {
    return res.data.data
  }, err => {
    err.message = 'Response Error!'
    return err
  })
  return instance(config)
}

export function reqClubtype(config) {
  const instance = axios.create({
    baseURL: 'http://localhost:18081/ucms/type',
    timeout: 5000
  })
  instance.interceptors.response.use(res => {
    return res.data.data
  }, err => {
    err.message = 'Response Error!'
    return err
  })
  return instance(config)
}

export function reqMessage(config) {
  const instance = axios.create({
    baseURL: 'http://localhost:18081/ucms/message',
    timeout: 5000
  })
  instance.interceptors.response.use(res => {
    return res.data.data
  }, err => {
    err.message = 'Response Error!'
    return err
  })
  return instance(config)
}

export function upAvatar(config) {
  const instance = axios.create({
    baseURL: 'http://localhost:18082/ucms/file',
    timeout: 5000
  })
  instance.interceptors.response.use(res => {
    return res.data.data
  }, err => {
    err.message = 'Response Error!'
    return err
  })
  return instance(config)
}

export function upHomeImg(config) {
  const instance = axios.create({
    baseURL: 'http://localhost:18082/ucms/file/uphome',
    timeout: 5000,
    method: "post"
  })
  instance.interceptors.response.use(res => {
    return res.data.data
  }, err => {
    err.message = 'Response Error!'
    return err
  })
  return instance(config)
}


export function reqFileUrl(config) {
  const instance = axios.create({
    baseURL: 'http://localhost:18082/ucms/file',
    timeout: 5000
  })
  instance.interceptors.response.use(res => {
    return res.data.data
  }, err => {
    err.message = 'Response Error!'
    return err
  })
  return instance(config)
}
