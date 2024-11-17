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
