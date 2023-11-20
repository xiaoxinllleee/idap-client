import { axios } from '@/utils/request'

export function getYjyxdyOption(query) {
  return axios({
    url: '/yxdygl/yjyxdygl/listAll',
    method: 'get',
    params: query
  })
}

export function getEjyxdyOption(query) {
  return axios({
    url: '/yxdygl/ejyxdygl/listAll',
    method: 'get',
    params: query
  })
}

export function getSjyxdyOption(query) {
  return axios({
    url: '/yxdygl/sjyxdygl/listAll',
    method: 'get',
    params: query
  })
}