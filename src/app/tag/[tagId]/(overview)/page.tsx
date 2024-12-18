import Pagination from '@/app/ui/pagination'
import { getEpisodeDetail, getPodcastsDetail, getPodEpisode } from '@/app/lib/service'
import { getCurrentLocalTime, getMetaData, getNoTagText, PUB_DATE, timeFormat, splitStringFromLastDash } from '@/app/lib/utils'
import Link from 'next/link'
import { Metadata, ResolvingMetadata } from 'next'
import { ClientSub } from '@/app/ui/clientDispatch'
import SearchEpisodesCard from '@/app/ui/search/search-episodes-card'
import Image from '@/app/ui/Image'
import { createServerAxios } from '@/app/lib/serveFetch'
import { summarized } from '@/app/lib/config'
import TagCardItem from '@/app/ui/ladingPage/tagCardItem'
export async function generateMetadata({ params, searchParams }: any, parent: ResolvingMetadata): Promise<Metadata> {
  const [title, showId] = splitStringFromLastDash(decodeURIComponent(params.tagId))

  return getMetaData({
    title: `[# tag名称] Related Episodes and Podcasts | PodExtra.AI`,
    description: `Dive into all "[# tag name]" related episodes and podcasts, enhanced with AI-powered transcription, summaries, takeaways, topics, mindmaps, outlines, keywords and highlights.`,
    keywords: `[tag名称], episodes, podcast summaries, podcast transcripts, AI transcription, mind maps, outlines, highlights, takeaways`,
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/tag/${showId}`,
    },
  })
}
export default async function Page({
  searchParams,
  params,
}: {
  searchParams?: {
    pageSize?: string
    page?: string
  }
  params: {
    podcastId: string
  }
}) {
  const { instance, refresh, token, refreshToken } = await createServerAxios()
  const [title, showId] = splitStringFromLastDash(decodeURIComponent(params.podcastId))
  const {
    data: { data },
  } = await instance.get(`v1/podShow/${showId}`) //getPodcastsDetail(showId)
  const { coverUrl, itunesAuthor, showDescription, categoryList, showTitle = '', followed = false } = data || {}
  const { pageSize = 50, page: pageNum = 1 } = searchParams || {}
  // const {
  //   data: {
  //     data: { resultList, total },
  //   },
  // } = await instance.get(`v1/podEpisode/pageQuery`, { params: { showId, sortBy: PUB_DATE, pageNum, pageSize } }) //getPodEpisode({ showId, sortBy: PUB_DATE, pageNum, pageSize })
  // const totalPages = Math.ceil(+total / +pageSize)
  const cardList = [
    {
      episodeId: 'ekhj2mq0eu',
      episodeUrl: '/episode/the-interview-rick-steves-refuses-to-ekhj2mq0eu',
      episodeTitle: "'The Interview': Rick Steves Refuses To Get Cynical About the World",
      showId: 'vm54pq4vwn',
      showTitle: 'The Daily',
      showCoverUrl:
        'https://image.simplecastcdn.com/images/7f2f4c05-9c2f-4deb-82b7-b538062bc22d/73549bf1-94b3-40ff-8aeb-b4054848ec1b/3000x3000/the-daily-album-art-original.jpg?aid=rss_feed',
      showUrl: '/podcast/the-daily-vm54pq4vwn',
      coverUrl:
        'https://image.simplecastcdn.com/images/89dbd88c-2405-42ec-ac2f-5f0877183f6d/aa175e16-dc20-4dde-8602-1d935ca20bee/3000x3000/14theinteview-steves-applespotify-small.jpg?aid=rss_feed',
      duration: 2554,
      currentPosition: 0,
      star: false,
      gmtPubDate: 1734174000000,
      showNotes:
        'The guidebook writer and television personality reflects on his cancer diagnosis, social media’s corrosive effect on tourism and the transformative power of travel.Unlock full access to New York Times podcasts and explore everything\nfrom politics to pop culture. Subscribe today at nytimes.com/podcasts or\non Apple Podcasts and Spotify.\n',
      summary:
        'A new study has found that nearly three-quarters of American adults are now obese or overweight, and there’s growing concern — among politicians, scientists and consumers — about one potential culprit: ultraprocessed foods.Guest: Alice Callahan, a nutrition and health reporter for The New York Times, discusses how these foods came to be such a big part of what we eat, and why that’s s',
      explicit: null,
      enclosureUrl:
        'https://dts.podtrac.com/redirect.mp3/pdst.fm/e/pfx.vpixl.com/6qj4J/nyt.simplecastaudio.com/03d8b493-87fc-4bd1-931f-8a8e9b945d8a/episodes/56da6caf-0cf0-43e1-a867-9f00a6c29ba9/audio/128/default.mp3?aid=rss_feed&awCollectionId=03d8b493-87fc-4bd1-931f-8a8e9b945d8a&awEpisodeId=56da6caf-0cf0-43e1-a867-9f00a6c29ba9&feed=Sl5CSM3S',
      enclosureLength: 40866128,
      enclosureType: 'audio/mpeg',
      episodeStatus: summarized,
      takeawyas: [
        'The future of programming is likely to be characterized by a greater music reliance on AI tool,The future of programming is likely to be characterized by a greater music reliance on AI tool',
        'The future of programming is likely to be characterized by a greater music reliance on AI tool,The future of programming is likely to be characterized by a greater music reliance on AI tool',
      ],
      tags: [
        'inspirations',
        ' AI-processed content',
        'inspirations',
        'Summary',
        'Summary',
        'Summary',
        'Summary',
        'Summary',
        'Summary',
        'Summary',
        'Summary',
        'Summary',
        'Summary',
        'Summary',
        'Summary',
        'Summary',
        'Summary',
        'Summary',
        'Summary',
      ],
    },
    {
      episodeId: 'xx1izla31y',
      episodeUrl: '/episode/a-turning-point-for-ultraprocessed-foods-xx1izla31y',
      episodeTitle: 'A Turning Point for Ultraprocessed Foods',
      showId: 'vm54pq4vwn',
      showTitle: 'The Daily',
      showCoverUrl:
        'https://image.simplecastcdn.com/images/7f2f4c05-9c2f-4deb-82b7-b538062bc22d/73549bf1-94b3-40ff-8aeb-b4054848ec1b/3000x3000/the-daily-album-art-original.jpg?aid=rss_feed',
      showUrl: '/podcast/the-daily-vm54pq4vwn',
      coverUrl:
        'https://image.simplecastcdn.com/images/34e5431c-f7f7-4edd-9b5d-0277e197a71b/271ddf79-df36-43dc-b28c-3831c32c14db/3000x3000/13thedailyspotifyapple.jpg?aid=rss_feed',
      duration: 1792,
      currentPosition: 0,
      star: false,
      gmtPubDate: 1734086700000,
      showNotes:
        '<p>A new study has found that nearly three-quarters of American adults are now obese or overweight, and there’s growing concern — among politicians, scientists and consumers — about one potential culprit: ultraprocessed foods.</p><p>Guest: <a href="https://www.nytimes.com/by/alice-callahan">Alice Callahan</a>, a nutrition and health reporter for The New York Times, discusses how these foods came to be such a big part of what we eat, and why that’s so hard to change. </p><p>Background reading: </p><ul><li>There’s not enough evidence to recommend avoiding ultraprocessed foods, a scientific advisory committee says.<a href="https://www.nytimes.com/2024/11/06/well/eat/ultraprocessed-foods-dietary-guidelines.html"> Some experts disagree</a>.</li><li>Name a common condition — heart disease, Type 2 diabetes, cancer, dementia, irritable bowel syndrome — and chances are good that a diet high in<a href="https://www.nytimes.com/2024/09/05/well/eat/ultraprocessed-foods-types-unhealthy-study.html"> ultraprocessed foods has been linked to it</a>. </li></ul><p>For more information on today’s episode, visit <a href="http://nytimes.com/thedaily?smid=pc-thedaily">nytimes.com/thedaily</a>. Transcripts of each episode will be made available by the next workday.</p>\n<p><p>Unlock full access to New York Times podcasts and explore everything from politics to pop culture. Subscribe today at <a href="http://nytimes.com/podcasts">nytimes.com/podcasts</a> or on Apple Podcasts and Spotify.</p></p>',
      summary:
        'A new study has found that nearly three-quarters of American adults are now obese or overweight, and there’s growing concern — among politicians, scientists and consumers — about one potential culprit: ultraprocessed foods.Guest: Alice Callahan, a nutrition and health reporter for The New York Times, discusses how these foods came to be such a big part of what we eat, and why that’s s',
      explicit: null,
      enclosureUrl:
        'https://dts.podtrac.com/redirect.mp3/pdst.fm/e/pfx.vpixl.com/6qj4J/nyt.simplecastaudio.com/03d8b493-87fc-4bd1-931f-8a8e9b945d8a/episodes/75dfb7a8-2d29-4ff8-91de-9fc56ece08b9/audio/128/default.mp3?aid=rss_feed&awCollectionId=03d8b493-87fc-4bd1-931f-8a8e9b945d8a&awEpisodeId=75dfb7a8-2d29-4ff8-91de-9fc56ece08b9&feed=Sl5CSM3S',
      enclosureLength: 28673430,
      enclosureType: 'audio/mpeg',
      episodeStatus: 'ONLINE',
    },
    {
      episodeId: 'rxt0ps3kn4',
      episodeUrl: '/episode/how-china-hacked-america-s-phone-network-rxt0ps3kn4',
      episodeTitle: 'How China Hacked America’s Phone Network',
      showId: 'vm54pq4vwn',
      showTitle: 'The Daily',
      showCoverUrl:
        'https://image.simplecastcdn.com/images/7f2f4c05-9c2f-4deb-82b7-b538062bc22d/73549bf1-94b3-40ff-8aeb-b4054848ec1b/3000x3000/the-daily-album-art-original.jpg?aid=rss_feed',
      showUrl: '/podcast/the-daily-vm54pq4vwn',
      coverUrl:
        'https://image.simplecastcdn.com/images/34e5431c-f7f7-4edd-9b5d-0277e197a71b/21c07b08-50a7-486e-a737-0385a454d6e6/3000x3000/12thedailyapplespotify.jpg?aid=rss_feed',
      duration: 1951,
      currentPosition: 0,
      star: false,
      gmtPubDate: 1734000300000,
      showNotes:
        '<p>An alarming new hack by China has penetrated the nerve center of the United States: its telephone network.</p><p>David E. Sanger, the White House and national security correspondent for The New York Times, discusses what the scope of the attack tells us about China’s growing power.</p><p>Guest: <a href="https://www.nytimes.com/by/david-e-sanger">David E. Sanger</a>, the White House and national security correspondent for The New York Times.</p><p>Background reading: </p><ul><li>The chairman of the Senate Intelligence Committee said<a href="https://www.nytimes.com/2024/11/21/us/politics/china-hacking-telecommunications.html"> hackers listened to phone calls and read texts</a> by exploiting aging equipment and seams in the networks that connect systems.</li><li>Emerging details of Chinese hack have left U.S. officials<a href="https://www.nytimes.com/2024/11/22/us/politics/chinese-hack-telecom-white-house.html"> increasingly concerned</a>.</li></ul><p>For more information on today’s episode, visit <a href="http://nytimes.com/thedaily?smid=pc-thedaily">nytimes.com/thedaily</a>. Transcripts of each episode will be made available by the next workday.</p>\n<p><p>Unlock full access to New York Times podcasts and explore everything from politics to pop culture. Subscribe today at <a href="http://nytimes.com/podcasts">nytimes.com/podcasts</a> or on Apple Podcasts and Spotify.</p></p>',
      summary:
        'A new study has found that nearly three-quarters of American adults are now obese or overweight, and there’s growing concern — among politicians, scientists and consumers — about one potential culprit: ultraprocessed foods.Guest: Alice Callahan, a nutrition and health reporter for The New York Times, discusses how these foods came to be such a big part of what we eat, and why that’s s',
      explicit: null,
      enclosureUrl:
        'https://dts.podtrac.com/redirect.mp3/pdst.fm/e/pfx.vpixl.com/6qj4J/nyt.simplecastaudio.com/03d8b493-87fc-4bd1-931f-8a8e9b945d8a/episodes/41f9c2d9-677d-4cba-9d49-b4b26c06bda6/audio/128/default.mp3?aid=rss_feed&awCollectionId=03d8b493-87fc-4bd1-931f-8a8e9b945d8a&awEpisodeId=41f9c2d9-677d-4cba-9d49-b4b26c06bda6&feed=Sl5CSM3S',
      enclosureLength: 31220056,
      enclosureType: 'audio/mpeg',
      episodeStatus: 'ONLINE',
    },
    {
      episodeId: 'ebc2acffky',
      episodeUrl: '/episode/notre-dame-rises-from-the-ashes-ebc2acffky',
      episodeTitle: 'Notre-Dame Rises From the Ashes',
      showId: 'vm54pq4vwn',
      showTitle: 'The Daily',
      showCoverUrl:
        'https://image.simplecastcdn.com/images/7f2f4c05-9c2f-4deb-82b7-b538062bc22d/73549bf1-94b3-40ff-8aeb-b4054848ec1b/3000x3000/the-daily-album-art-original.jpg?aid=rss_feed',
      showUrl: '/podcast/the-daily-vm54pq4vwn',
      coverUrl:
        'https://image.simplecastcdn.com/images/34e5431c-f7f7-4edd-9b5d-0277e197a71b/4549c791-4b7e-4374-b574-6f6cd5e8b801/3000x3000/nyt-podcast-thedaily-20-1.jpg?aid=rss_feed',
      duration: 2293,
      currentPosition: 0,
      star: false,
      gmtPubDate: 1733913900000,
      showNotes:
        '<p>On Sunday, after a fire that many feared would destroy it, and a swift renovation that defied all predictions, the Cathedral of Notre-Dame reopened to the public.</p><p>Michael Kimmelman, the chief architecture critic at The Times, tells the story of the miracle on the Seine.</p><p>Guest: <a href="https://www.nytimes.com/by/michael-kimmelman">Michael Kimmelman</a>, the architecture critic of The New York Times and the founder and editor-at-large of<a href="https://www.nytimes.com/section/headway"> Headway</a>.</p><p>Background reading: </p><ul><li>Critic’s Notebook:<a href="https://www.nytimes.com/interactive/2024/12/05/arts/design/notre-dame-reopens-paris.html"> Notre-Dame’s astonishing rebirth from the ashes</a>.</li><li>The rebuilding took about<a href="https://www.nytimes.com/2024/12/06/world/europe/notre-dame-paris-france.html"> 250 companies, 2,000 workers, about $900 million</a>, a tight deadline and a lot of national pride.</li><li><a href="https://www.nytimes.com/2024/12/07/world/europe/notre-dame-reopening-photos.html">See photos</a> from the reopening.</li></ul><p>For more information on today’s episode, visit <a href="http://nytimes.com/thedaily?smid=pc-thedaily">nytimes.com/thedaily</a>. Transcripts of each episode will be made available by the next workday.</p>\n<p><p>Unlock full access to New York Times podcasts and explore everything from politics to pop culture. Subscribe today at <a href="http://nytimes.com/podcasts">nytimes.com/podcasts</a> or on Apple Podcasts and Spotify.</p></p>',
      summary:
        'A new study has found that nearly three-quarters of American adults are now obese or overweight, and there’s growing concern — among politicians, scientists and consumers — about one potential culprit: ultraprocessed foods.Guest: Alice Callahan, a nutrition and health reporter for The New York Times, discusses how these foods came to be such a big part of what we eat, and why that’s s',
      explicit: null,
      enclosureUrl:
        'https://dts.podtrac.com/redirect.mp3/pdst.fm/e/pfx.vpixl.com/6qj4J/nyt.simplecastaudio.com/03d8b493-87fc-4bd1-931f-8a8e9b945d8a/episodes/1df57650-5016-478c-b33b-6771c83a9644/audio/128/default.mp3?aid=rss_feed&awCollectionId=03d8b493-87fc-4bd1-931f-8a8e9b945d8a&awEpisodeId=1df57650-5016-478c-b33b-6771c83a9644&feed=Sl5CSM3S',
      enclosureLength: 36696930,
      enclosureType: 'audio/mpeg',
      episodeStatus: 'ONLINE',
    },
    {
      episodeId: 'uexiqtzeqw',
      episodeUrl: '/episode/ep-62-watch-out-for-the-worms-uexiqtzeqw',
      episodeTitle: 'Ep. 62 | Watch Out for the Worms',
      showId: 'pun54hmzzv',
      showTitle: 'MrBallen’s Medical Mysteries',
      showCoverUrl:
        'https://content.production.cdn.art19.com/images/04/25/8a/a0/04258aa0-1104-457f-a375-fc0822bdc6da/44a703b82007639f1331135888138ac18ba2b28523febc27eee92789f67da592ad2dcfd12fc89d13eaa9aa4196139a838305b76a16845cfe40ccc18e27d3f4c0.jpeg',
      showUrl: '/podcast/mrballen-s-medical-mysteries-pun54hmzzv',
      coverUrl:
        'https://content.production.cdn.art19.com/images/04/25/8a/a0/04258aa0-1104-457f-a375-fc0822bdc6da/44a703b82007639f1331135888138ac18ba2b28523febc27eee92789f67da592ad2dcfd12fc89d13eaa9aa4196139a838305b76a16845cfe40ccc18e27d3f4c0.jpeg',
      duration: 1478,
      currentPosition: 0,
      star: false,
      gmtPubDate: 1733817660000,
      showNotes:
        '\n        <p>A mother is terrified when her five-year-old daughter suddenly develops obsessive compulsive disorder, that leaves her completely unable to eat. Desperate to save her child, the mother embarks on a heart-pounding quest to find an answer before it’s too late.</p><p><br></p><p>Follow MrBallen\'s Medical Mysteries on Amazon Music or wherever you get your podcasts. New episodes publish for free every Tuesday. Prime members can binge episodes 57-64 early and ad-free on Amazon Music. Wondery+ subscribers can listen ad-free--join Wondery+ in the Wondery App or on Apple Podcasts.</p><p><br></p><p>See Privacy Policy at <a href="https://art19.com/privacy" rel="noopener noreferrer" target="_blank">https://art19.com/privacy</a> and California Privacy Notice at <a href="https://art19.com/privacy#do-not-sell-my-info" rel="noopener noreferrer" target="_blank">https://art19.com/privacy#do-not-sell-my-info</a>.</p>\n      ',
      summary:
        'A new study has found that nearly three-quarters of American adults are now obese or overweight, and there’s growing concern — among politicians, scientists and consumers — about one potential culprit: ultraprocessed foods.Guest: Alice Callahan, a nutrition and health reporter for The New York Times, discusses how these foods came to be such a big part of what we eat, and why that’s s',
      explicit: null,
      enclosureUrl:
        'https://dts.podtrac.com/redirect.mp3/chrt.fm/track/9EE2G/pdst.fm/e/rss.art19.com/episodes/2ece45ab-8cd4-4718-a8b3-34feceec2ab4.mp3?rss_browser=BAhJIg5Qb2RFbmdpbmUGOgZFVA%3D%3D--fbe06f707d31ae7b133688ae54fb53a345571816',
      enclosureLength: 23650638,
      enclosureType: 'audio/mpeg',
      episodeStatus: 'ONLINE',
    },
    {
      episodeId: 'zvfb4xyvrx',
      episodeUrl: '/episode/are-the-bills-the-best-zvfb4xyvrx',
      episodeTitle: 'Are the Bills the best?',
      showId: 'kpjbhqtj5v',
      showTitle: 'Sunday Mornings with Matt and Myron',
      showCoverUrl:
        'https://megaphone.imgix.net/podcasts/982512c6-4741-11ee-89c4-2f871a4fa93b/image/201348abe893ac62ee2db61028bc87ca.jpg?ixlib=rails-4.3.1&max-w=3000&max-h=3000&fit=crop&auto=format,compress',
      showUrl: '/podcast/sunday-mornings-with-matt-and-myron-kpjbhqtj5v',
      coverUrl:
        'https://megaphone.imgix.net/podcasts/982512c6-4741-11ee-89c4-2f871a4fa93b/image/201348abe893ac62ee2db61028bc87ca.jpg?ixlib=rails-4.3.1&max-w=3000&max-h=3000&fit=crop&auto=format,compress',
      duration: 2898,
      currentPosition: 0,
      star: false,
      gmtPubDate: 1733694660000,
      showNotes:
        "Countdown to Kickoff HR 2: Myron and Gabe Neitzel talk more about today's CFP release, discuss the Bills place in the NFL's hierarchy, why the Chargers wont beat the Chiefs tonight, and talk to ESPN's Herm Edwards about what's coming up today in the NFL.\nLearn more about your ad choices. Visit podcastchoices.com/adchoices",
      summary:
        'A new study has found that nearly three-quarters of American adults are now obese or overweight, and there’s growing concern — among politicians, scientists and consumers — about one potential culprit: ultraprocessed foods.Guest: Alice Callahan, a nutrition and health reporter for The New York Times, discusses how these foods came to be such a big part of what we eat, and why that’s s',
      explicit: null,
      enclosureUrl: 'https://traffic.megaphone.fm/ESP4201840781.mp3?updated=1733695481',
      enclosureLength: 0,
      enclosureType: 'audio/mpeg',
      episodeStatus: 'ONLINE',
    },
    {
      episodeId: 'nefzyhvylo',
      episodeUrl: '/episode/who-should-be-in-the-cfp-nefzyhvylo',
      episodeTitle: 'Who should be in the CFP?',
      showId: 'kpjbhqtj5v',
      showTitle: 'Sunday Mornings with Matt and Myron',
      showCoverUrl:
        'https://megaphone.imgix.net/podcasts/982512c6-4741-11ee-89c4-2f871a4fa93b/image/201348abe893ac62ee2db61028bc87ca.jpg?ixlib=rails-4.3.1&max-w=3000&max-h=3000&fit=crop&auto=format,compress',
      showUrl: '/podcast/sunday-mornings-with-matt-and-myron-kpjbhqtj5v',
      coverUrl:
        'https://megaphone.imgix.net/podcasts/982512c6-4741-11ee-89c4-2f871a4fa93b/image/201348abe893ac62ee2db61028bc87ca.jpg?ixlib=rails-4.3.1&max-w=3000&max-h=3000&fit=crop&auto=format,compress',
      duration: 2891,
      currentPosition: 0,
      star: false,
      gmtPubDate: 1733694540000,
      showNotes:
        'Countdown to Kickoff HR 1 - Myron and Gabe Neitzel talk about Championship Saturday in CFB, and who should be in the playoffs. Plus, a revenge game for Kirk Cousins today, and we run the "No Huddle"\nLearn more about your ad choices. Visit podcastchoices.com/adchoices',
      summary:
        'A new study has found that nearly three-quarters of American adults are now obese or overweight, and there’s growing concern — among politicians, scientists and consumers — about one potential culprit: ultraprocessed foods.Guest: Alice Callahan, a nutrition and health reporter for The New York Times, discusses how these foods came to be such a big part of what we eat, and why that’s s',
      explicit: null,
      enclosureUrl: 'https://traffic.megaphone.fm/ESP9392893168.mp3?updated=1733695455',
      enclosureLength: 0,
      enclosureType: 'audio/mpeg',
      episodeStatus: 'ONLINE',
    },
    {
      episodeId: 'xighpkkrct',
      episodeUrl: '/episode/chiefs-magic-bird-bowl-bill-murray-on-xighpkkrct',
      episodeTitle: 'Chiefs Magic, Bird Bowl & Bill Murray on Iconic Career, Best SNL Host, Prank Calls & More | Ep 113',
      showId: 'uzu05bf4o0',
      showTitle: 'New Heights with Jason & Travis Kelce',
      showCoverUrl:
        'https://content.production.cdn.art19.com/images/50/8c/c6/07/508cc607-9df2-4d46-b780-849a4ce75910/0e9e1abc6c94ff054752b57ddd492628fe30f0bc806288d6bbec036088829127e79445611943eee18f630dc76956a3272406bbe2afdd0c029385f2097b937eeb.jpeg',
      showUrl: '/podcast/new-heights-with-jason-travis-kelce-uzu05bf4o0',
      coverUrl:
        'https://content.production.cdn.art19.com/images/bb/6a/89/71/bb6a8971-39f7-497b-b1da-e8d52816d8a5/9ec84f5380848942bba9856e2dd97252c268aec5e7df4e83c1ff739a0503f88c0f460e5f81be7a3bba4c342907b11532b6b0573e714397eba9fb91a19cfef3c2.jpeg',
      duration: 5908,
      currentPosition: 0,
      star: false,
      gmtPubDate: 1733310000000,
      showNotes:
        '\n        <p>92%ers, we are back with another episode of New Heights presented by our friends at Google TV. No more endless browsing. Google TV makes it easy to find what to watch.&nbsp;</p><p>In this episode, we are joined by an incredible guest, Ernie McCracken himself, Bill Murray.&nbsp;</p><p>Before we sit down with Bill, we answer a celebrity voicemail demanding we review a specific movie for Christmas, Travis breaks down the controversial ending of the Chiefs Black Friday game against the Raiders, and Jason shares his thoughts on the Eagles continuing their hot streak against Lamar Jackson and the Ravens.&nbsp;</p><p>Finally, we sit down with Bill Murray and talk about everything from his favorite golf partners, what it was like growing up in the Murray household, how a “cat lady” got him started in improv, the early days of SNL, his surprise pick for best host of all time, the worst thing he’s ever said on camera, and why he’s still making prank calls about “Road House.”&nbsp;</p><p>You can listen to new episodes early and ad-free on Wondery+. Join Wondery+ in the Wondery App, Apple Podcasts or Spotify.</p><p>.</p><p>.</p><p>.</p><p>Follow New Heights on Social Media for all the best moments from the show:&nbsp;</p><p><a href="https://lnk.to/newheightshow" rel="noopener noreferrer" target="_blank">https://lnk.to/newheightshow</a></p><p>Starting December 4th, head to <a href="https://www.homage.com/newheights" rel="noopener noreferrer" target="_blank">https://www.homage.com/newheights</a> to order our Limited edition holiday merch. Order by December 9th to get it by Christmas!</p><p>Support the Show:&nbsp;&nbsp;</p><p><strong>GOOGLE TV:</strong> No more endless browsing. Google TV makes it easy to find what to watch. Head to <a href="http://g.co/tv/newheights" rel="noopener noreferrer" target="_blank">http://g.co/tv/newheights</a> right now to learn more. And while you’re at it, check out Jason’s show and movie confessions only on Google TV!</p><p><strong>ESPN ON DISNEY+: </strong>ESPN on Disney+ - Your favorite sports, movies, and shows are all in one place.</p><p><strong>THE FARMER’S DOG: </strong>Get 50% off your first box of fresh, healthy food at <a href="https://thefarmersdog.com/newheights" rel="noopener noreferrer" target="_blank">https://thefarmersdog.com/newheights</a>. Plus, you get FREE shipping!&nbsp;</p><p><strong>AMAZON PRIME: </strong>From streaming to shopping, It’s on Prime. Visit <a href="https://amazon.com/prime" rel="noopener noreferrer" target="_blank">https://Amazon.com/prime</a> to get more out of whatever you’re into.</p><p><strong>SEAT GEEK:</strong> Use our code for 10% off your SeatGeek order*. <a href="https://seatgeek.onelink.me/RrnK/NEWHEIGHTS" rel="noopener noreferrer" target="_blank">https://seatgeek.onelink.me/RrnK/NEWHEIGHTS</a> $25 max discount</p><p><strong>ALLSTATE: </strong>Checking first is smart. So, check Allstate first for a quote that could save you hundreds. You’re in good hands with Allstate.</p><p>This content is intended for audiences in the U.S. only. Savings vary. Terms apply. Allstate Fire and Casualty Insurance Company &amp; affiliates. Northbrook, IL.</p><p>See Privacy Policy at <a href="https://art19.com/privacy" rel="noopener noreferrer" target="_blank">https://art19.com/privacy</a> and California Privacy Notice at <a href="https://art19.com/privacy#do-not-sell-my-info" rel="noopener noreferrer" target="_blank">https://art19.com/privacy#do-not-sell-my-info</a>.</p>\n      ',
      summary:
        'A new study has found that nearly three-quarters of American adults are now obese or overweight, and there’s growing concern — among politicians, scientists and consumers — about one potential culprit: ultraprocessed foods.Guest: Alice Callahan, a nutrition and health reporter for The New York Times, discusses how these foods came to be such a big part of what we eat, and why that’s s',
      explicit: null,
      enclosureUrl:
        'https://dts.podtrac.com/redirect.mp3/chrt.fm/track/9EE2G/pdst.fm/e/clrtpod.com/m/pscrb.fm/rss/p/arttrk.com/p/BLPSN/arttrk.com/p/WVWPN/rss.art19.com/episodes/1f5c0006-d0a6-4a28-9ae3-375ad5e19957.mp3?rss_browser=BAhJIg5Qb2RFbmdpbmUGOgZFVA%3D%3D--fbe06f707d31ae7b133688ae54fb53a345571816',
      enclosureLength: 94537769,
      enclosureType: 'audio/mpeg',
      episodeStatus: 'ONLINE',
    },
    {
      episodeId: 'oxy0ft55r2',
      episodeUrl: '/episode/stars-wars-holiday-special-oxy0ft55r2',
      episodeTitle: 'Stars Wars Holiday Special',
      showId: 'saqne4l34t',
      showTitle: 'Office Ladies',
      showCoverUrl:
        'https://megaphone.imgix.net/podcasts/68d29e08-2805-11ef-a151-afd45121a6bf/image/727a9275edffbad6145bdc7626082464.jpg?ixlib=rails-4.3.1&max-w=3000&max-h=3000&fit=crop&auto=format,compress',
      showUrl: '/podcast/office-ladies-saqne4l34t',
      coverUrl:
        'https://megaphone.imgix.net/podcasts/68d29e08-2805-11ef-a151-afd45121a6bf/image/727a9275edffbad6145bdc7626082464.jpg?ixlib=rails-4.3.1&max-w=3000&max-h=3000&fit=crop&auto=format,compress',
      duration: 5369,
      currentPosition: 0,
      star: false,
      gmtPubDate: 1733288400000,
      showNotes:
        'This week, Office Ladies kick off the holiday season by breaking down the “Stars Wars Holiday Special”! This special came out in 1978 and follows Chewbacca and Han Solo trying to get home to Chewbacca’s family on the planet of Kashyyyk to celebrate “Life Day”.  It is often referred to as one of the most bizarre things to exist in the Star Wars universe. Angela shares what Star Wars action figure became the world’s most valuable toy, Jenna points out some all-star cameos and the team tries Bantha stew and Joh Blastoh punch. This episode will get you in the holiday spirit and make you want to learn Wookieespeak. \n\nWatch the "Star Wars Holiday Special" Here: https://www.youtube.com/watch?v=6hH8rxarVG8\n\nCheck out Office Ladies Merch at Podswag: https://www.podswag.com/collections/office-ladies \n\nOffice Ladies Website - Submit a fan question: https://officeladies.com/submitaquestion \nFollow Us on Instagram: OfficeLadiesPod\n \nTo learn more about listener data and our privacy practices visit: https://www.audacyinc.com/privacy-policy\n  \n Learn more about your ad choices. Visit https://podcastchoices.com/adchoices',
      summary:
        'A new study has found that nearly three-quarters of American adults are now obese or overweight, and there’s growing concern — among politicians, scientists and consumers — about one potential culprit: ultraprocessed foods.Guest: Alice Callahan, a nutrition and health reporter for The New York Times, discusses how these foods came to be such a big part of what we eat, and why that’s s',
      explicit: null,
      enclosureUrl:
        'https://www.podtrac.com/pts/redirect.mp3/pdst.fm/e/chtbl.com/track/42D75/traffic.megaphone.fm/CAD2507981760.mp3?updated=1733250828',
      enclosureLength: 0,
      enclosureType: 'audio/mpeg',
      episodeStatus: 'ONLINE',
    },
    {
      episodeId: '4cxh1ekhxy',
      episodeUrl: '/episode/what-a-weekday-a-tough-monday-at-the-4cxh1ekhxy',
      episodeTitle: 'What a Weekday: A Tough Monday at the Justice Department',
      showId: 'kiy5rv5owy',
      showTitle: 'Lovett or Leave It',
      showCoverUrl:
        'https://image.simplecastcdn.com/images/a0e2bc12-ecf7-455e-91a9-e02971097c0f/c66355a2-81e2-4454-a209-4af4345aa6b9/3000x3000/loli-512x512.jpg?aid=rss_feed',
      showUrl: '/podcast/lovett-or-leave-it-kiy5rv5owy',
      coverUrl:
        'https://image.simplecastcdn.com/images/72ee68d7-f59d-46ec-bd07-7075b313f14b/1b0aeda5-afb7-4795-8fa8-d69130c17110/3000x3000/wawd.jpg?aid=rss_feed',
      duration: 2788,
      currentPosition: 0,
      star: false,
      gmtPubDate: 1733272325000,
      showNotes:
        '<p>Biden pardons Hunter after all. Trump picks Kash Patel for FBI director, just like the Deep State wanted all along. RFK Jr. and Cheryl Hines invite us into their shower. And Lovett flies off the handle for Wicked and Gladiator II, dog-monkey CGI be damned.</p><p> </p><p>For a closed-captioned version of this episode, click <a href="https://youtu.be/npiSLIl6v5A">here</a>. For a transcript of this episode, please email transcripts@crooked.com and include the name of the podcast.</p>\n',
      summary:
        'A new study has found that nearly three-quarters of American adults are now obese or overweight, and there’s growing concern — among politicians, scientists and consumers — about one potential culprit: ultraprocessed foods.Guest: Alice Callahan, a nutrition and health reporter for The New York Times, discusses how these foods came to be such a big part of what we eat, and why that’s s',
      explicit: null,
      enclosureUrl:
        'https://pdst.fm/e/chrt.fm/track/479722/arttrk.com/p/CRMDA/claritaspod.com/measure/pscrb.fm/rss/p/mgln.ai/e/284/dts.podtrac.com/redirect.mp3/pdrl.fm/0e86ba/stitcher.simplecastaudio.com/7c4b28c1-0aba-48d1-89d9-94769ef8d1c4/episodes/73310fce-5025-46ab-a5e2-9f32fbfb1bae/audio/128/default.mp3?aid=rss_feed&awCollectionId=7c4b28c1-0aba-48d1-89d9-94769ef8d1c4&awEpisodeId=73310fce-5025-46ab-a5e2-9f32fbfb1bae&feed=pdSmCK46',
      enclosureLength: 44621841,
      enclosureType: 'audio/mpeg',
      episodeStatus: 'ONLINE',
    },
  ]
  return (
    <main className={`flex flex-col`}>
      {/*<ClientSub val={showTitle} />*/}
      <div className={`flex `}></div>
      <div className={`sticky top-[60px] bg-white dark:bg-black pb-[20px] z-[99]`}>
        <Pagination totalPages={10} total={100} title="episodes" />
      </div>
      <div className={`border-[1px] border-gray-1000 rounded-10px p-[15px] dark:border-fontGry-600`}>
        {cardList?.slice(0, 4)?.map((card, index) => <TagCardItem card={card} key={index} isDetail />)}
      </div>
    </main>
  )
}
