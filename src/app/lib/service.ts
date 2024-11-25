import { fetchPost, fetchGet, upPost, fetchPut } from './fetch'
export function getPodShow(payload: any) {
  const isV2 = payload?.categoryId || false
  return fetchGet(`${isV2 ? 'v2' : 'v1'}/podShow/pageQuery`, payload)
}
export function getPodEpisode(payload: any) {
  return fetchGet('v1/podEpisode/pageQuery', payload)
}
export function getPodCategory(payload: any) {
  return fetchGet('v1/podCategory/pageQuery', payload)
}
export function getPopularPodcasts(payload: any) {
  return fetchGet('v1/podCategory/pageQuery', payload)
}
export function getPodcastsDetail(showId: string) {
  return fetchGet(`v1/podShow/${showId}`, {})
}
export function getEpisodeDetail(episodeId: string) {
  return fetchGet(`v1/podEpisode/${episodeId}`, {})
}
export function getEpisodeSummarize(episodeId: string) {
  return fetchGet(`v1/podEpisode/${episodeId}/summarize`, {})
}
export function getEpisodeTranscript(episodeId: string) {
  return fetchGet(`v1/podEpisode/${episodeId}/transcript`, {})
}
//登录
export function userLogin(data: any) {
  return fetchPost(`/api/proxy/v1/account/auth`, data)
}
//登录 客户端
export function userLoginOut() {
  return fetchPost(`/api/proxy/v1/account/signOut`, {})
}
//获取用户信息 客户端
export function getUerInfo() {
  return fetchGet(`/api/proxy/v1/account/info`, {})
}
//刷新token 客户端
export function refreshIdToken() {
  return fetchGet(`/api/proxy/v1/account/refreshIdToken`, {})
}
//获取搜索数据
export function getSearchList(data: any) {
  return fetchPost(`/v1/search`, data)
}
//获取sku列表
export function getSkuList(data: any) {
  return fetchGet(`/v1/sku/list`, data)
}
//创建订单
export function createOrder(data: any) {
  return fetchPost(`/api/proxy/v1/order/create`, data)
}
//获取订单信息
export function getOrderInfo(orderId: string) {
  return fetchGet(`/api/proxy/v1/order/${orderId}/query-status`, {})
}
//获取script管理页面
export function getAdminUrl(data: any) {
  return fetchPost(`/api/proxy/v1/subscription/get-admin-url`, data)
}
//创建summarize任务
export function createSummarizeTask(data: any) {
  return fetchPost(`/v1/podEpisode/{episodeId}/create-summarize-task`, data)
}
