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
