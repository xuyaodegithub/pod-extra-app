'use client'
import { useMyContext } from '@/context/MyContext'
import { ChevronRightIcon } from '@heroicons/react/24/outline'
import styles from '@/app/ui/home.module.scss'
import SearchPodcastCard from './search-podcast-card'

export default function SearchPodcasts() {
  const { isDark } = useMyContext()
  const list = [
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
  return (
    <div>
      <div className={`flex items-center mb-[12px] text-lg text-fontGry-600 ml-[24px] font-bold cursor-pointer`}>
        <div className={`${styles.hoverBBorder} dark:text-white`}>Podcasts</div>
        <ChevronRightIcon className={`ml-[10px] w-[20px] dark:text-white`} />
      </div>
      <div className={`border-[1px] border-bgGray rounded-[10px] p-[14px] dark:border-fontGry-600`}>
        {list.map((item: any, ind: number) => {
          const { coverUrl, categoryList, showId, itunesAuthor, showTitle, showDescription, gmtLastUpdate, showUrl } = item
          const noMb = ind >= list.length - 1
          return (
            <SearchPodcastCard
              item={{ coverUrl, categoryList, showId, itunesAuthor, showTitle, showDescription, gmtLastUpdate, showUrl }}
              noMb={noMb}
            />
          )
        })}
      </div>
      {list.length > 4 && (
        <div className="w-[160px] flex items-center justify-center text-sm text-fontGry-600 py-[6px] px-[15px] rounded-[6px] mt-[20px] mx-auto cursor-pointer dark:text-white">
          <span>show all podcasts </span>
          <ChevronRightIcon className={`w-[14px] dark:text-white`} />
        </div>
      )}
    </div>
  )
}
