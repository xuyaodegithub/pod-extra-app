import { POPULARITY, PUB_DATE, SUMMARIZE_TIME, TRANSCRIPT_TIME, getMetaData } from '@/app/lib/utils'
import { Metadata } from 'next'
import Link from 'next/link'
import SearchTabs from '@/app/ui/search/search-tabs'
import { searchTabs } from '@/app/lib/config'
import SearchPodcasts from '@/app/ui/search/search-podcasts'
import SearchEpisodes from '@/app/ui/search/search-episodes'
import { getSearchList } from '@/app/lib/service'

export const metadata: Metadata = getMetaData({
  title: 'Search | PodExtra.AI',
  description: '',
  keywords: '',
})
export default async function Search({
  searchParams,
}: {
  searchParams?: {
    pageSize?: string
    page?: string
    word?: string
    tab?: string
  }
}) {
  const { pageSize, page, word, tab = searchTabs[0].key } = searchParams || {}
  console.log(pageSize, page, word, '-----')
  const payload = {
    keyword: word,
    searchType: tab,
  }
  const podcasts = [
    {
      showId: 'vm54pq4vwn',
      showUrl: '/podcast/the-daily-vm54pq4vwn',
      coverUrl:
        'https://image.simplecastcdn.com/images/7f2f4c05-9c2f-4deb-82b7-b538062bc22d/73549bf1-94b3-40ff-8aeb-b4054848ec1b/3000x3000/the-daily-album-art-original.jpg?aid=rss_feed',
      showTitle: 'The Daily',
      itunesAuthor: 'The New York Times',
      language: 'en',
      explicit: 0,
      itunesShowType: 'EPISODIC',
      popularityScore: 999,
      showDescription:
        'This is what the news should sound like. The biggest stories of our time, told by the best journalists in the world. Hosted by Michael Barbaro and Sabrina Tavernise. Twenty minutes a day, five days a week, ready by 6 a.m. \n\nUnlock full access to New York Times podcasts and explore everything from politics to pop culture. Subscribe today at nytimes.com/podcasts or on Apple Podcasts and Spotify. \n \nListen to this podcast in New York Times Audio, our new iOS app for news subscribers. Download now at nytimes.com/audioapp',
      gmtLastUpdate: 1731321900000,
      categoryList: [
        { categoryId: '1489', categoryName: 'News', categoryUrl: '/podcasts-categories/news?categoryId=1489', children: null },
      ],
    },
    {
      showId: 'hqeqewqyss',
      showUrl: '/podcast/crime-junkie-hqeqewqyss',
      coverUrl:
        'https://image.simplecastcdn.com/images/a1a87b67-2865-4234-a087-b342aa30c358/ae42d51b-df99-4b19-bb3f-09f25598bcdd/3000x3000/crimejunkie-logo-registered.jpg?aid=rss_feed',
      showTitle: 'Crime Junkie',
      itunesAuthor: 'audiochuck',
      language: 'en',
      explicit: 0,
      itunesShowType: 'EPISODIC',
      popularityScore: 998,
      showDescription: 'If you can never get enough true crime... Congratulations, you’ve found your people.',
      gmtLastUpdate: 1731312000000,
      categoryList: [
        {
          categoryId: '1488',
          categoryName: 'True Crime',
          categoryUrl: '/podcasts-categories/true-crime?categoryId=1488',
          children: null,
        },
      ],
    },
    {
      showId: 'fdksz1pdhw',
      showUrl: '/podcast/pod-save-america-fdksz1pdhw',
      coverUrl:
        'https://image.simplecastcdn.com/images/9aa1e238-cbed-4305-9808-c9228fc6dd4f/eb7dddd4-ecb0-444c-b379-f75d7dc6c22b/3000x3000/uploads-2f1595947484360-nc4atf9w7ur-dbbaa7ee07a1ee325ec48d2e666ac261-2fpodsave100daysfinal1800.jpg?aid=rss_feed',
      showTitle: 'Pod Save America',
      itunesAuthor: 'Crooked Media',
      language: 'en',
      explicit: 0,
      itunesShowType: 'EPISODIC',
      popularityScore: 997,
      showDescription:
        'Pod Save America is a no-bullshit conversation about politics hosted by former Obama aides Jon Favreau, Jon Lovett, Dan Pfeiffer, and Tommy Vietor. It cuts through the noise to break down the week’s news and helps people figure out what matters and how they can help. They’re regularly joined by journalists, activists, politicians, entertainers, and world leaders. You can watch on YouTube or listen to new episodes every Tuesday, Wednesday and Friday.\n\nAd-Free Pod Save America episodes available NOW through Friends of the Pod subscription. Head to crooked.com/friends to join today!\n\nFor a transcript of an episode of Pod Save America, please email transcripts@crooked.com (edited)',
      gmtLastUpdate: 1731225600000,
      categoryList: [
        { categoryId: '1489', categoryName: 'News', categoryUrl: '/podcasts-categories/news?categoryId=1489', children: null },
      ],
    },
    {
      showId: '32hclhizn5',
      showUrl: '/podcast/dateline-nbc-32hclhizn5',
      coverUrl:
        'https://image.simplecastcdn.com/images/ae183fe2-c634-458a-93dd-5770f0676f77/b010809a-c311-425c-9325-2235c21e6939/3000x3000/7f0421f73d2ce0ca272e392c937e1a301285d44fe7c6d710c2844d80c0c7bb1a3e9838ac03ee80fc64199891cb9d5c6e9d4490f5081fb379c0ab2317f2cadf14.jpeg?aid=rss_feed',
      showTitle: 'Dateline NBC',
      itunesAuthor: 'NBC News',
      language: 'en',
      explicit: 0,
      itunesShowType: 'EPISODIC',
      popularityScore: 996,
      showDescription:
        'Current and classic episodes, featuring compelling true-crime mysteries, powerful documentaries and in-depth investigations.\n\n\nFollow now to get the latest episodes of Dateline NBC completely free, or subscribe to Dateline Premium for ad-free listening and exclusive bonus content: DatelinePremium.com',
      gmtLastUpdate: 1730984037000,
      categoryList: [
        {
          categoryId: '1488',
          categoryName: 'True Crime',
          categoryUrl: '/podcasts-categories/true-crime?categoryId=1488',
          children: null,
        },
      ],
    },
    {
      showId: 'rzadn4pb2d',
      showUrl: '/podcast/the-joe-rogan-experience-rzadn4pb2d',
      coverUrl:
        'https://megaphone.imgix.net/podcasts/8e5bcebc-ca16-11ee-89f0-0fa0b9bdfc7c/image/05de50adade05c16262eab5c7ed1dd66.jpg?ixlib=rails-4.3.1&max-w=3000&max-h=3000&fit=crop&auto=format,compress',
      showTitle: 'The Joe Rogan Experience',
      itunesAuthor: 'Joe Rogan',
      language: 'en',
      explicit: 1,
      itunesShowType: 'EPISODIC',
      popularityScore: 1000,
      showDescription: 'The official podcast of comedian Joe Rogan.',
      gmtLastUpdate: 1731088800000,
      categoryList: [
        { categoryId: '1303', categoryName: 'Comedy', categoryUrl: '/podcasts-categories/comedy?categoryId=1303', children: null },
      ],
    },
  ]
  const episodes = [
    {
      episodeId: 'zfoo3vyaqi',
      episodeUrl: '/episode/the-interview-nancy-pelosi-insists-the-zfoo3vyaqi',
      episodeTitle: "'The Interview': Nancy Pelosi Insists the Election Was Not a Rebuke of the Democrats",
      showId: 'vm54pq4vwn',
      showTitle: 'The Daily',
      showCoverUrl:
        'https://image.simplecastcdn.com/images/7f2f4c05-9c2f-4deb-82b7-b538062bc22d/73549bf1-94b3-40ff-8aeb-b4054848ec1b/3000x3000/the-daily-album-art-original.jpg?aid=rss_feed',
      showUrl: '/podcast/the-daily-vm54pq4vwn',
      coverUrl:
        'https://image.simplecastcdn.com/images/89dbd88c-2405-42ec-ac2f-5f0877183f6d/eb941d91-6c09-439a-816c-7752de87acde/3000x3000/09interview-pelosi-applespotify-small.jpg?aid=rss_feed',
      duration: 2376,
      gmtPubDate: 1731150000000,
      showNotes:
        'The former House Speaker reflects on Donald Trump’s victory, Kamala Harris’s candidacy and the future of the Democratic Party.Unlock full access to New York Times podcasts and explore everything\nfrom politics to pop culture. Subscribe today at nytimes.com/podcasts or\non Apple Podcasts and Spotify.\n',
      summary: null,
      explicit: 0,
      enclosureUrl:
        'https://nyt.simplecastaudio.com/03d8b493-87fc-4bd1-931f-8a8e9b945d8a/episodes/2e984fdc-fbca-4e81-9322-308c3279bafa/audio/128/default.mp3?aid=rss_feed&awCollectionId=03d8b493-87fc-4bd1-931f-8a8e9b945d8a&awEpisodeId=2e984fdc-fbca-4e81-9322-308c3279bafa&feed=Sl5CSM3S',
      enclosureLength: 38018136,
      enclosureType: 'audio/mpeg',
      itunesAuthor: 'The New York Times',
    },
    {
      episodeId: '1foatsirbh',
      episodeUrl: '/episode/the-big-suey-the-loss-rating-scale-1foatsirbh',
      episodeTitle: 'The Big Suey: The Loss Rating Scale',
      showId: 'qkp4to5kw0',
      showTitle: 'The Dan Le Batard Show with Stugotz',
      showCoverUrl:
        'https://megaphone.imgix.net/podcasts/353b02e2-4f64-11eb-938f-27ae6b16a7ea/image/64bdb3ce15bca05b19f5973483fa70da.jpg?ixlib=rails-4.3.1&max-w=3000&max-h=3000&fit=crop&auto=format,compress',
      showUrl: '/podcast/the-dan-le-batard-show-with-stugotz-qkp4to5kw0',
      coverUrl:
        'https://megaphone.imgix.net/podcasts/353b02e2-4f64-11eb-938f-27ae6b16a7ea/image/64bdb3ce15bca05b19f5973483fa70da.jpg?ixlib=rails-4.3.1&max-w=3000&max-h=3000&fit=crop&auto=format,compress',
      duration: 3205,
      gmtPubDate: 1730825100000,
      showNotes:
        "Dianna Russini has an eye on 18 players and 13 teams at the Deadline and one of them is Za'Darius Smith, who is on the move from the Browns. Also, is every team terrible? Then, Dan gives us what could be one of the most outrageous takes in show history about Bill Russell and Greg Cote has some thoughts on the Dolphins close loss to the Bills. That leads to a very intense discussion about what merits a good win, a bad win, a good loss and a good win. Greg Cote even goes so far as to even propose a new way of judging football games beyond just wins and losses. Plus, Dominique Foxworth thinks the Bills were scared to hit Tua, the Cowboys are buyers, Penn State and LSU continue to get away with it and are we still making Mals?\nLearn more about your ad choices. Visit podcastchoices.com/adchoices",
      summary: null,
      explicit: 0,
    },
    {
      episodeId: 'asyqryzoyh',
      episodeUrl: '/episode/the-last-vigil-before-polls-close-asyqryzoyh',
      episodeTitle: 'The Last Vigil Before Polls Close',
      showId: 'h0ntvtdhus',
      showTitle: 'The Charlie Kirk Show',
      showCoverUrl:
        'https://www.omnycontent.com/d/playlist/5e27a451-e6e6-4c51-aa03-a7370003783c/c865b590-c84f-4f7e-a43e-ac64014b61d9/8978e846-cacd-4d65-b085-ac64014cd49f/image.jpg?t=1715015526&size=Large',
      showUrl: '/podcast/the-charlie-kirk-show-h0ntvtdhus',
      coverUrl:
        'https://www.omnycontent.com/d/playlist/5e27a451-e6e6-4c51-aa03-a7370003783c/c865b590-c84f-4f7e-a43e-ac64014b61d9/8978e846-cacd-4d65-b085-ac64014cd49f/image.jpg?t=1715015526&size=Large',
      duration: 5271,
      gmtPubDate: 1730842402000,
      showNotes:
        '<p>Polls close in a matter of hours. Where is turnout high? Where is it low? How do things look in Pennsylvania, Nevada, and beyond? Charlie and the crew talk to Brett Galaszewski, Rich Baris, and more, and read a mountain of election-day emails, because right now, all we can do is wait.</p><p><a href="http://www.charliekirk.com/support" rel="payment">Support the show: http://www.charliekirk.com/support</a></p><p>See <a href="https://omnystudio.com/listener">omnystudio.com/listener</a> for privacy information.</p>',
      summary: null,
      explicit: 0,
    },
    {
      episodeId: 'hncv5jmbpd',
      episodeUrl: '/episode/what-divorce-can-teach-you-about-the-hncv5jmbpd',
      episodeTitle: 'What divorce can teach you about the power of being alone and the rebirthday of Katie Maloney',
      showId: 'amd4vyx1c0',
      showTitle: 'Brutally Anna',
      showCoverUrl:
        'https://megaphone.imgix.net/podcasts/83420e14-8650-11ef-a0de-876679829f72/image/4262f31fe9776e906c7c2e15aa20a84e.jpg?ixlib=rails-4.3.1&max-w=3000&max-h=3000&fit=crop&auto=format,compress',
      showUrl: '/podcast/brutally-anna-amd4vyx1c0',
      coverUrl:
        'https://megaphone.imgix.net/podcasts/83420e14-8650-11ef-a0de-876679829f72/image/4262f31fe9776e906c7c2e15aa20a84e.jpg?ixlib=rails-4.3.1&max-w=3000&max-h=3000&fit=crop&auto=format,compress',
      duration: 4716,
      gmtPubDate: 1730714400000,
      showNotes:
        'Vanderpump Rules star and entrepreneur Katie Maloney shows us why the path not taken is often the path we’re meant to take. On this week’s episode Katie details her life as a college dropout, her days before reality TV and VPR, and how she decided that she could only find her best life if she found the courage to end her marriage. We discuss whether she would ever get married again, how she’s found peace as a single thirty-something in L.A., and how she’s no longer willing to be dragged into anyone’s drama, even if it means being alone.\n\nFor anyone who has felt like their life has, metaphorically, ended, Katie’s story of overcoming a traumatic brain injury and her divorce shows us that there’s no limit, in her words, to the amount of software updates you can have in life. \n\nFollow Katie @musickillskate\nLearn more about your ad choices. Visit podcastchoices.com/adchoices',
      summary: null,
      explicit: 0,
    },
    {
      episodeId: 'lcn5q2nktu',
      episodeUrl: '/episode/emotions-2-0-the-benefits-of-mixed-lcn5q2nktu',
      episodeTitle: 'Emotions 2.0: The Benefits of Mixed Emotions',
      showId: 'xsoeswboxf',
      showTitle: 'Hidden Brain',
      showCoverUrl:
        'https://image.simplecastcdn.com/images/5b7d8c77-15ba-4eff-a999-2e725db21db5/5da6be39-fd7a-4d15-80cb-9b518d140957/3000x3000/hidden-brain-cover.jpg?aid=rss_feed',
      showUrl: '/podcast/hidden-brain-xsoeswboxf',
      coverUrl:
        'https://image.simplecastcdn.com/images/5982e1b7-239c-4b89-81f9-49df1f33fdae/0d10b099-4301-42de-94a4-ac252e076587/3000x3000/1.jpg?aid=rss_feed',
      duration: 3091,
      gmtPubDate: 1730754260000,
      showNotes:
        '<p>Sometimes we feel just one single feeling with overwhelming force. We\'re joyously happy. We\'re crushingly sad. But sometimes it\'s more complicated than that: We feel happy <i>and </i>sad at the same time. This week, we revisit a favorite 2022 episode with psychologist <a href="https://business.lehigh.edu/directory/naomi-b-rothman" target="_blank">Naomi Rothman</a>, who shares her research on the mixed emotion of ambivalence. She explores how being of two minds changes the way we think, and how it changes the way others see us. </p><p><i>Did you catch the first two episodes in our Emotions 2.0 series? You can find them in this podcast feed, or on our website, </i><a href="https://hiddenbrain.org/"><i>hiddenbrain.org</i></a><i>. Thanks for listening! </i></p>\n',
      summary: null,
      explicit: 0,
    },
  ]

  return (
    <main className={`flex flex-col`}>
      <SearchTabs className={``} tab={tab} />
      {tab !== searchTabs[2].key && <SearchPodcasts podcasts={podcasts} tab={tab} />}
      {tab !== searchTabs[1].key && <SearchEpisodes episodes={episodes} tab={tab} />}
    </main>
  )
}
