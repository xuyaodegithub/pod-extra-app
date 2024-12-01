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
export function getEpisodeDetail(episodeId: string, token?: any, params?: any) {
  return fetchGet(`v1/podEpisode/${episodeId}`, {}, token)
}
export function getEpisodeSummarize(episodeId: string) {
  return fetchGet(`/api/proxy/v1/podEpisode/${episodeId}/summarize`, {})
}
export function getEpisodeTranscript(episodeId: string) {
  return fetchGet(`/api/proxy/v1/podEpisode/${episodeId}/transcript`, {})
}
//登录
export function userLogin(data: any) {
  return fetchPost(`/v1/account/auth`, data)
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
export function createSummarizeTask(episodeId: string) {
  return fetchPost(`/api/proxy/v1/podEpisode/${episodeId}/create-summarize-task`, {})
}
//收藏的节目
export function getFlowPodcast(data: any) {
  return fetchGet(`/v1/podcast/my-favorite`, data)
}
//收藏节目
export function flowPodcast(podcastId: string) {
  return fetchPost(`/api/proxy/v1/podcast/${podcastId}/add-favorite`, {})
}
//取消收藏节目
export function unFlowPodcast(podcastId: string) {
  return fetchPost(`/api/proxy/v1/podcast/${podcastId}/remove-favorite`, {})
}
//我收藏的单集
export function getFlowEpisode(data: any) {
  return fetchGet(`/v1/episode/my-favorite`, data)
}
//收藏单集
export function flowEpisode(episodeId: any) {
  return fetchPost(`/api/proxy/v1/episode/${episodeId}/add-favorite`, {})
}
//取消收藏单集
export function unFlowEpisode(episodeId: any) {
  return fetchPost(`/api/proxy/v1/episode/${episodeId}/remove-favorite`, {})
}
