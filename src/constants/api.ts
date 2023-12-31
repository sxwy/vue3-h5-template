let BASE_API = ''

switch (__APP_ENV__) {
  case 'mock':
    BASE_API = `${location.origin}/base`
    break
  case 'alpha':
    BASE_API = 'http://alpha-api.xxx.com'
    break
  case 'rc':
    BASE_API = 'https://rc-api.xxx.cn'
    break
  case 'prod':
  default:
    BASE_API = 'https://api.xxx.cn'
    break
}

export { BASE_API }
