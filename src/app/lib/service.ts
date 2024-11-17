import { fetchPost, fetchGet, upPost, fetchPut } from './fetch'
export function getPodShow(payload: any) {
  return fetchGet('v1/podShow/pageQuery', payload)
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
