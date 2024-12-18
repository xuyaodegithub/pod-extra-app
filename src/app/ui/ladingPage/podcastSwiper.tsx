'use client'
import { useRouter } from 'next/navigation'
import { useMyContext } from '@/context/MyContext'
import Link from 'next/link'
import styles from '@/app/ui/home.module.scss'
import { ChevronRightIcon } from '@heroicons/react/24/outline'
import { POPULARITY, PUB_DATE } from '@/app/lib/utils'
import Image from '@/app/ui/Image'
import { useRef } from 'react'

export default function PodcastSwiper({ type }: { type: string }) {
  const { isDark, setIsDark } = useMyContext()
  const scrollRef = useRef<HTMLDivElement>(null)
  const domRef = useRef<any>(null)
  const { push } = useRouter()
  const stepNum = 5
  const title = POPULARITY === type ? 'Popular Podcasts' : 'Latest Podcasts'
  const urlObj: any = {
    [POPULARITY]: '/popular-top-best-podcasts',
    [PUB_DATE]: '/new-latest-podcasts',
  }
  const resultList: any = [
    {
      showId: 'z5ivi3tka2',
      showUrl: '/podcast/cancelled-with-tana-mongeau-brooke-z5ivi3tka2',
      coverUrl: 'https://audioboom.com/i/41819744/s=1400x1400/el=1/rt=fill.png',
      showTitle: 'Cancelled with Tana Mongeau & Brooke Schofield',
      itunesAuthor: 'Cancelled & Audioboom Studios',
      language: 'en',
      followed: false,
      explicit: null,
      itunesShowType: null,
      popularityScore: null,
      showDescription:
        'EXTRA! EXTRA! CANCELLED is coming back better than ever with your favorite co-host besties Tana Mongeau and Brooke Schofield. After years of growing up under the constant scrutiny of public opinion, social media juggernaut, Tana Mongeau, is officially taking back the mic (again!). Acting as a natural evolution of her acclaimed “storytime” videos, this show offers an intimate look at Mongeau, her meteoric rise to superstardom, and the unavoidable moments of vulnerability that make this cyber-personality all the more human. CANCELLED will continue to seek to shed a new light, not only on its hosts, but on the enigmatic world of “the influencer,” featuring lively celeb tell-alls, current event commentary, and Tana and Brooke’s unfiltered take on the drama that relentlessly follows them both.',
      gmtLastUpdate: 1733109767000,
      categoryList: [
        {
          categoryId: '1324',
          categoryName: 'Society & Culture',
          categoryUrl: '/podcasts-categories/society-culture?categoryId=1324',
          children: null,
        },
      ],
    },
    {
      showId: '33z5wufrqb',
      showUrl: '/podcast/morning-brew-daily-33z5wufrqb',
      coverUrl:
        'https://megaphone.imgix.net/podcasts/c0a7bc5e-5cf5-11ec-9d07-cbfe22d3f89b/image/9e7619bc57725599009c40e26bbadbc5.png?ixlib=rails-4.3.1&max-w=3000&max-h=3000&fit=crop&auto=format,compress',
      showTitle: 'Morning Brew Daily',
      itunesAuthor: 'Morning Brew',
      language: 'en',
      followed: false,
      explicit: null,
      itunesShowType: null,
      popularityScore: null,
      showDescription:
        'Morning Brew Daily, a daily talk show that covers the latest news on business, the economy, and everything else, with Neal Freyman and Toby Howell. Witty, informative and everything you need to start your day. Available on all podcasting platforms and Youtube.',
      gmtLastUpdate: 1733227334000,
      categoryList: [
        {
          categoryId: '1321',
          categoryName: 'Business',
          categoryUrl: '/podcasts-categories/business?categoryId=1321',
          children: null,
        },
        {
          categoryId: '1489',
          categoryName: 'News',
          categoryUrl: '/podcasts-categories/news?categoryId=1489',
          children: null,
        },
      ],
    },
    {
      showId: 'kiy5rv5owy',
      showUrl: '/podcast/lovett-or-leave-it-kiy5rv5owy',
      coverUrl:
        'https://image.simplecastcdn.com/images/a0e2bc12-ecf7-455e-91a9-e02971097c0f/c66355a2-81e2-4454-a209-4af4345aa6b9/3000x3000/loli-512x512.jpg?aid=rss_feed',
      showTitle: 'Lovett or Leave It',
      itunesAuthor: 'Crooked Media',
      language: 'en',
      followed: false,
      explicit: null,
      itunesShowType: null,
      popularityScore: null,
      showDescription:
        'Every Saturday, former Obama speechwriter and self-described "comedian" Jon Lovett is joined live on stage by a killer lineup of comics, journalists, politicians, and celebrities - who may or may not know why they\'re there - to break down the biggest and dumbest stories in politics and culture.\\n\\nAnd now because there’s too much news for just one show, join Jon and friends (i.e. beloved producers who have to be there) every Tuesday for a rundown of the latest headlines to help get you through another flawless week in our perfect society.\\n\\nPlus for those who like to watch (*wink*), you can catch all the funniest moments and gayest chaos on the Lovett or Leave It YouTube channel. So check us out there, and listen to Lovett or Leave It wherever you get your podcasts.',
      gmtLastUpdate: 1733272325000,
      categoryList: [
        {
          categoryId: '1303',
          categoryName: 'Comedy',
          categoryUrl: '/podcasts-categories/comedy?categoryId=1303',
          children: null,
        },
        {
          categoryId: '1489',
          categoryName: 'News',
          categoryUrl: '/podcasts-categories/news?categoryId=1489',
          children: null,
        },
      ],
    },
    {
      showId: 'xi0fi1fakg',
      showUrl: '/podcast/breaking-points-with-krystal-and-saagar-xi0fi1fakg',
      coverUrl:
        'https://www.omnycontent.com/d/playlist/e73c998e-6e60-432f-8610-ae210140c5b1/e7fd5ae7-7621-4e41-9b85-b0ab0164b634/4c1a5135-4197-47c9-b19b-b0ab0164b667/image.jpg?t=1710381870&size=Large',
      showTitle: 'Breaking Points with Krystal and Saagar',
      itunesAuthor: 'iHeartPodcasts',
      language: 'en',
      followed: false,
      explicit: null,
      itunesShowType: null,
      popularityScore: null,
      showDescription:
        'Breaking Points is a fearless anti-establishment multi-week Youtube and Podcast which holds the powerful to account hosted by Krystal Ball and Saagar Enjeti',
      gmtLastUpdate: 1733246334000,
      categoryList: [
        {
          categoryId: '1489',
          categoryName: 'News',
          categoryUrl: '/podcasts-categories/news?categoryId=1489',
          children: null,
        },
      ],
    },
    {
      showId: '1041hzdkab',
      showUrl: '/podcast/snapped-women-who-murder-1041hzdkab',
      coverUrl:
        'https://content.production.cdn.art19.com/images/d6/00/9e/b0/d6009eb0-9b07-4ba6-a789-100939717b57/7c02d2966ac19a84e2023c4131df7f9aee56c0880c3a07c9f63bfcd3e8cec2310c1f095ed52f9aefdaa9a0b5eef22aa1691d1da0dd3eedcef834977157fa4efa.jpeg',
      showTitle: 'Snapped: Women Who Murder',
      itunesAuthor: 'Oxygen',
      language: 'en',
      followed: false,
      explicit: null,
      itunesShowType: null,
      popularityScore: null,
      showDescription:
        '\\n      <p>For the first time ever, full Snapped episodes are now a podcast. Subscribe to this true crime podcast for the direct audio from the original Snapped episodes that have aired on Oxygen over the last 29 seasons (and counting)! Now you can enjoy Snapped episodes in your headphones, in your car, or at the gym. New true crime episodes of Snapped: Women Who Murder are released every Sunday. </p>\\n    ',
      gmtLastUpdate: 1733029200000,
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
      showId: 'rlb3cxuclk',
      showUrl: '/podcast/how-did-this-get-made-rlb3cxuclk',
      coverUrl:
        'https://image.simplecastcdn.com/images/00c81e60-45f9-4643-9fed-2184b2b6a3d3/9fb18d59-cb0c-4d92-ba6b-ee54eca6d2ea/3000x3000/earwolf-sxm-hdtgm.jpg?aid=rss_feed',
      showTitle: 'How Did This Get Made?',
      itunesAuthor: 'Earwolf and Paul Scheer, June Diane Raphael, Jason Mantzoukas',
      language: 'en',
      followed: false,
      explicit: null,
      itunesShowType: null,
      popularityScore: null,
      showDescription:
        'The award-winning comedy podcast that celebrates bad movies. Comedians and actors Paul Scheer (The League), June Diane Raphael (Grace and Frankie), and Jason Mantzoukas (Big Mouth) break down the very best of the worst films ever made—we’re talkin’ blockbuster flops, cheesy 80s action movies, Lifetime thrillers, obscure cult classics, and if we’re honest… most Nic Cage and Jason Statham movies. Plus, sometimes they’re even joined by hilarious guests like Seth Rogen, Conan O’Brien, Amy Schumer, Nicole Byer, Nick Kroll, and Charlize Theron. And the best part? They watch these bad movies so you don’t have to! \\n \\nNew episodes every Friday. Classic episodes re-released every Monday.',
      gmtLastUpdate: 1733115900000,
      categoryList: [
        {
          categoryId: '1303',
          categoryName: 'Comedy',
          categoryUrl: '/podcasts-categories/comedy?categoryId=1303',
          children: null,
        },
        {
          categoryId: '1309',
          categoryName: 'TV & Film',
          categoryUrl: '/podcasts-categories/tv-film?categoryId=1309',
          children: null,
        },
      ],
    },
    {
      showId: 'mxv1ii00vv',
      showUrl: '/podcast/the-tim-dillon-show-mxv1ii00vv',
      coverUrl: 'https://audioboom.com/i/40034741/s=1400x1400/el=1/rt=fill.jpg',
      showTitle: 'The Tim Dillon Show',
      itunesAuthor: 'The Tim Dillon Show',
      language: 'en',
      followed: false,
      explicit: null,
      itunesShowType: null,
      popularityScore: null,
      showDescription:
        'Tim Dillon is a comedian and tour guide. He’s very excited to give you a tour of the end of the world. Each week from a porch in Los Angeles he shares apocalyptic visions with his friends and berates a local diner.',
      gmtLastUpdate: 1732986000000,
      categoryList: [
        {
          categoryId: '1303',
          categoryName: 'Comedy',
          categoryUrl: '/podcasts-categories/comedy?categoryId=1303',
          children: null,
        },
        {
          categoryId: '1489',
          categoryName: 'News',
          categoryUrl: '/podcasts-categories/news?categoryId=1489',
          children: null,
        },
      ],
    },
    {
      showId: 'saqne4l34t',
      showUrl: '/podcast/office-ladies-saqne4l34t',
      coverUrl:
        'https://megaphone.imgix.net/podcasts/68d29e08-2805-11ef-a151-afd45121a6bf/image/727a9275edffbad6145bdc7626082464.jpg?ixlib=rails-4.3.1&max-w=3000&max-h=3000&fit=crop&auto=format,compress',
      showTitle: 'Office Ladies',
      itunesAuthor: 'Audacy & Jenna Fischer and Angela Kinsey',
      language: 'en',
      followed: false,
      explicit: null,
      itunesShowType: null,
      popularityScore: null,
      showDescription:
        'The Office co-stars and best friends, Jenna Fischer and Angela Kinsey, are doing the ultimate The Office re-watch podcast for you. Each week Jenna and Angela will break down an episode of The Office and give exclusive behind the scene stories that only two people who were there, can tell you.',
      gmtLastUpdate: 1733288400000,
      categoryList: [
        {
          categoryId: '1303',
          categoryName: 'Comedy',
          categoryUrl: '/podcasts-categories/comedy?categoryId=1303',
          children: null,
        },
      ],
    },
    {
      showId: '2xsyhrkqcm',
      showUrl: '/podcast/living-the-red-life-2xsyhrkqcm',
      coverUrl: 'https://artwork.captivate.fm/7e450d51-ed50-4549-b29e-13caad3ed7be/sLneop789OtTfmvBNaliuo27.jpg',
      showTitle: 'Living The Red Life',
      itunesAuthor: 'Rudy Mawer',
      language: 'en',
      followed: false,
      explicit: null,
      itunesShowType: null,
      popularityScore: null,
      showDescription:
        "Living The Red Life is your ticket to learning from The King Of Ads himself, Rudy Mawer AKA “The Man in Red''. From building an unshakable business foundation (and unstoppable team), to scaling your brand to 8-figures+, Living The Red Life is the go-to podcast for entrepreneurs & online business owners who are ready to level up their business and build a lasting legacy. Each week discover lessons from Rudy to help you scale your business and expand your thinking to new levels of success. \\n",
      gmtLastUpdate: 1732780800000,
      categoryList: [
        {
          categoryId: '1321',
          categoryName: 'Business',
          categoryUrl: '/podcasts-categories/business?categoryId=1321',
          children: null,
        },
      ],
    },
    {
      showId: 'toanydz40p',
      showUrl: '/podcast/founders-story-toanydz40p',
      coverUrl:
        'https://media.redcircle.com/images/2024/6/1/5/2bff6084-3cb7-49e8-962a-4901ffac6b0e_8b28f3da-4a54-4211-b140-5363c9407b93_hosted_by.jpg',
      showTitle: "Founder's Story",
      itunesAuthor: 'IBH Media',
      language: 'en',
      followed: false,
      explicit: null,
      itunesShowType: null,
      popularityScore: null,
      showDescription:
        '<p>&#34;Founder&#39;s Story&#34; by IBH Media is not just a show—it&#39;s an immersive journey into the lives of the world&#39;s most inspiring business figures. This series explores the personal and professional realms of visionary leaders. Each episode offers an unfiltered look at the resilience, creativity, and relentless drive that define the entrepreneurial spirit. From sharing their greatest victories to revealing their most challenging setbacks, these candid conversations provide a tapestry of invaluable insights. Tune in to discover the raw, unvarnished stories of industry giants like Gary V, Codie Sanchez, Rob Dyrdek, Shelley Zalis, Noah Kagan, Kate Hancock, Ryan Serhant, Kara Goldin, and will.i.am. &#34;Founder&#39;s Story&#34; is where the heart of entrepreneurship beats.</p>',
      gmtLastUpdate: 1732950834000,
      categoryList: [
        {
          categoryId: '1321',
          categoryName: 'Business',
          categoryUrl: '/podcasts-categories/business?categoryId=1321',
          children: null,
        },
      ],
    },
    {
      showId: 'ovbsgcwcrz',
      showUrl: '/podcast/tales-from-the-stinky-dragon-ovbsgcwcrz',
      coverUrl:
        'https://megaphone.imgix.net/podcasts/aea7fa88-9ec7-11eb-ac98-035d697b0c6b/image/5548f242d94662eec70ad325f3e92631.jpg?ixlib=rails-4.3.1&max-w=3000&max-h=3000&fit=crop&auto=format,compress',
      showTitle: 'Tales from the Stinky Dragon',
      itunesAuthor: 'Stinky Dragon',
      language: 'en',
      followed: false,
      explicit: null,
      itunesShowType: null,
      popularityScore: null,
      showDescription:
        'Tales from the Stinky Dragon is an actual-play D&D comedy podcast that features four foolish friends and their (very patient) dungeon master. Join along for an auditory adventure with a fully-voiced cast of characters, immersive sound design, a catchy soundtrack, and gripping stories of exotic lands and strange creatures. Tales From The Stinky Dragon is a fun and easy award-winning podcast for all ages, and is the perfect experience for both seasoned D&D players and those just getting into the genre.',
      gmtLastUpdate: 1732694400000,
      categoryList: [
        {
          categoryId: '1483',
          categoryName: 'Fiction',
          categoryUrl: '/podcasts-categories/fiction?categoryId=1483',
          children: null,
        },
        {
          categoryId: '1502',
          categoryName: 'Leisure',
          categoryUrl: '/podcasts-categories/leisure?categoryId=1502',
          children: null,
        },
      ],
    },
    {
      showId: '0dpgipjtng',
      showUrl: '/podcast/unsubscribe-podcast-0dpgipjtng',
      coverUrl:
        'https://megaphone.imgix.net/podcasts/8c71a7ae-ad7d-11ed-8374-0bf4bcdcb553/image/unsub6.png?ixlib=rails-4.3.1&max-w=3000&max-h=3000&fit=crop&auto=format,compress',
      showTitle: 'Unsubscribe Podcast',
      itunesAuthor: 'UnsubscribePodcast',
      language: 'en',
      followed: false,
      explicit: null,
      itunesShowType: null,
      popularityScore: null,
      showDescription: 'Welcome to the Unsubscribe Podcast with Eli Doubletap, Brandon Herrera, Donut Operator & The Fat Electrician!',
      gmtLastUpdate: 1733144400000,
      categoryList: [
        {
          categoryId: '1303',
          categoryName: 'Comedy',
          categoryUrl: '/podcasts-categories/comedy?categoryId=1303',
          children: null,
        },
        {
          categoryId: '1324',
          categoryName: 'Society & Culture',
          categoryUrl: '/podcasts-categories/society-culture?categoryId=1324',
          children: null,
        },
      ],
    },
    {
      showId: 'x3rr2wh3lh',
      showUrl: '/podcast/up-and-vanished-x3rr2wh3lh',
      coverUrl:
        'https://megaphone.imgix.net/podcasts/a57182f8-1ffe-11e9-8e74-4b4d4b64cfd9/image/UAV4_TempCover2.jpg?ixlib=rails-4.3.1&max-w=3000&max-h=3000&fit=crop&auto=format,compress',
      showTitle: 'Up and Vanished',
      itunesAuthor: 'Tenderfoot TV',
      language: 'en',
      followed: false,
      explicit: null,
      itunesShowType: null,
      popularityScore: null,
      showDescription:
        'Host Payne Lindsey heads to the edge of the arctic circle to investigate two mysterious disappearances from Nome, Alaska. Up and Vanished investigates mysterious cold case disappearances with each new season of the hit true crime franchise. Season 1: The case of missing South Georgia teacher, Tara Grinstead, led to two arrests. Season 2: The disappearance of Kristal Reisinger, a young mother who disappeared from a remote Colorado mountain town. Season 3: The North West Montana disappearance of Ashley Loring HeavyRunner, an indigenous woman who went missing from the Blackfeet Nation Indian Reservation. Season 4: The case of missing Alaska Native, Florence Okpealuk and missing 36-year-old Joseph Balderas.',
      gmtLastUpdate: 1732280400000,
      categoryList: [
        {
          categoryId: '1324',
          categoryName: 'Society & Culture',
          categoryUrl: '/podcasts-categories/society-culture?categoryId=1324',
          children: null,
        },
        {
          categoryId: '1488',
          categoryName: 'True Crime',
          categoryUrl: '/podcasts-categories/true-crime?categoryId=1488',
          children: null,
        },
      ],
    },
    {
      showId: '5cbxgttmgb',
      showUrl: '/podcast/global-news-podcast-5cbxgttmgb',
      coverUrl: 'http://ichef.bbci.co.uk/images/ic/3000x3000/p09kz1gg.jpg',
      showTitle: 'Global News Podcast',
      itunesAuthor: 'BBC World Service',
      language: 'en',
      followed: false,
      explicit: null,
      itunesShowType: null,
      popularityScore: null,
      showDescription:
        '<p>The day’s top stories from BBC News, including the latest on the Middle East conflict – bringing you developments from Lebanon, Israel, Gaza and Iran. Delivered twice a day on weekdays, daily at weekends.</p>',
      gmtLastUpdate: 1733269380000,
      categoryList: [
        {
          categoryId: '1324',
          categoryName: 'Society & Culture',
          categoryUrl: '/podcasts-categories/society-culture?categoryId=1324',
          children: null,
        },
        {
          categoryId: '1489',
          categoryName: 'News',
          categoryUrl: '/podcasts-categories/news?categoryId=1489',
          children: null,
        },
      ],
    },
    {
      showId: '4ch21vdewb',
      showUrl: '/podcast/small-town-murder-4ch21vdewb',
      coverUrl:
        'https://content.production.cdn.art19.com/images/1b/bc/fe/05/1bbcfe05-f4a9-4450-9fe7-77084830de38/476fd5af015ba1883b95ba0cf96e96b0145dca0381246f4e42903fa814b540309faf8b3c5402a4d1e7b374e332b49bfa8b29a2c2b607fb2c695604a4335fbd3a.jpeg',
      showTitle: 'Small Town Murder',
      itunesAuthor: 'James Pietragallo, Jimmie Whisman',
      language: 'en',
      followed: false,
      explicit: null,
      itunesShowType: null,
      popularityScore: null,
      showDescription:
        "\\n      <p>Two comedians look at a small town, what makes it tick, and a murder that took place there. In depth research, horrible tragedy, and the hosts' comedic spin on the whole thing. New episodes every Thursday!! </p>\\n    ",
      gmtLastUpdate: 1732927500000,
      categoryList: [
        {
          categoryId: '1303',
          categoryName: 'Comedy',
          categoryUrl: '/podcasts-categories/comedy?categoryId=1303',
          children: null,
        },
      ],
    },
    {
      showId: '43nu4jmn41',
      showUrl: '/podcast/decoder-ring-43nu4jmn41',
      coverUrl:
        'https://megaphone.imgix.net/podcasts/9a4c2c2a-3e8b-11e8-bd53-9b1115bac0fa/image/230322_DecoderRingTile_final__1_.jpg?ixlib=rails-4.3.1&max-w=3000&max-h=3000&fit=crop&auto=format,compress',
      showTitle: 'Decoder Ring',
      itunesAuthor: 'Slate Podcasts',
      language: 'en',
      followed: false,
      explicit: null,
      itunesShowType: null,
      popularityScore: null,
      showDescription:
        'Decoder Ring is the show about cracking cultural mysteries. In each episode, host Willa Paskin takes a cultural question, object, or habit; examines its history; and tries to figure out what it means and why it matters.',
      gmtLastUpdate: 1732089600000,
      categoryList: [
        {
          categoryId: '1324',
          categoryName: 'Society & Culture',
          categoryUrl: '/podcasts-categories/society-culture?categoryId=1324',
          children: null,
        },
        {
          categoryId: '1487',
          categoryName: 'History',
          categoryUrl: '/podcasts-categories/history?categoryId=1487',
          children: null,
        },
      ],
    },
    {
      showId: 'x3klno2sb2',
      showUrl: '/podcast/the-presidents-daily-brief-x3klno2sb2',
      coverUrl:
        'https://megaphone.imgix.net/podcasts/b7679c8a-b1d3-11ec-b149-9787f3061796/image/TPDB_MIKE_BAKER_3K.png?ixlib=rails-4.3.1&max-w=3000&max-h=3000&fit=crop&auto=format,compress',
      showTitle: "The President's Daily Brief",
      itunesAuthor: 'The First TV',
      language: 'en',
      followed: false,
      explicit: null,
      itunesShowType: null,
      popularityScore: null,
      showDescription:
        "Each morning, the President of the United States receives a highly classified briefing on the most important issues facing the country -- The President's Daily Brief. Now you can hear your very own PDB, in the form of a podcast, every morning at 6am Eastern, and every afternoon at 4pm Eastern. You'll get 20 minutes of the most important topics of the day and why you should care, arming you with what you need to know to help solve America's most pressing challenges. Former CIA Operations Officer Mike Baker hosts new episodes daily.",
      gmtLastUpdate: 1733260893000,
      categoryList: [
        {
          categoryId: '1489',
          categoryName: 'News',
          categoryUrl: '/podcasts-categories/news?categoryId=1489',
          children: null,
        },
      ],
    },
    {
      showId: 'mwo000yqq5',
      showUrl: '/podcast/hot-mess-with-alix-earle-mwo000yqq5',
      coverUrl:
        'https://image.simplecastcdn.com/images/5b7d8c77-15ba-4eff-a999-2e725db21db5/245d0dd2-5ab6-469b-9269-92168270e307/3000x3000/sxm-cover-hot-mess-r2024-3000x3000-final.jpg?aid=rss_feed',
      showTitle: 'Hot Mess with Alix Earle',
      itunesAuthor: 'Unwell',
      language: 'en',
      followed: false,
      explicit: null,
      itunesShowType: null,
      popularityScore: null,
      showDescription:
        "Join your favorite hot mess, Alix Earle, as she invites you to listen in on a weekly recap of her life revealing all the in-depth, exclusive details that has everyone watching, talking, and wanting more. For the first time ever, Alix will be letting you in on what is actually happening, beyond her trending TikToks. From friendships to family, relationship updates to rumors, traveling and navigating life after college, get ready for all the behind-the-scenes details that you've been waiting for. Let's be honest, life is messy, and Alix is here to remind you that we're all on this journey together. So welcome, you are now officially invited to the debrief.",
      gmtLastUpdate: 1732780800000,
      categoryList: [
        {
          categoryId: '1301',
          categoryName: 'Arts',
          categoryUrl: '/podcasts-categories/arts?categoryId=1301',
          children: null,
        },
        {
          categoryId: '1324',
          categoryName: 'Society & Culture',
          categoryUrl: '/podcasts-categories/society-culture?categoryId=1324',
          children: null,
        },
      ],
    },
    {
      showId: 'aos2gizdv0',
      showUrl: '/podcast/radio-rental-aos2gizdv0',
      coverUrl:
        'https://megaphone.imgix.net/podcasts/67c2580c-ec8a-11e9-8cda-4f484557f606/image/ac24ba3c839cd587ce2c4f9214e8e9de.jpg?ixlib=rails-4.3.1&max-w=3000&max-h=3000&fit=crop&auto=format,compress',
      showTitle: 'Radio Rental',
      itunesAuthor: 'Tenderfoot TV & Audacy',
      language: 'en',
      followed: false,
      explicit: null,
      itunesShowType: null,
      popularityScore: null,
      showDescription:
        'Discover real-life horror stories, from bizarre crimes to paranormal activity. These true stories are set inside the fictional world of Radio Rental, an 80’s video rental store run by an eccentric shopkeeper, Terry Carnation (Rainn Wilson). This imaginative, cult classic-inspired horror brand blurs the lines of reality, with cutting-edge documentary storytelling and a splash of comedy. From the mind of Payne Lindsey, this is Radio Rental.',
      gmtLastUpdate: 1732867320000,
      categoryList: [
        {
          categoryId: '1324',
          categoryName: 'Society & Culture',
          categoryUrl: '/podcasts-categories/society-culture?categoryId=1324',
          children: null,
        },
      ],
    },
    {
      showId: 't2lggjxmpl',
      showUrl: '/podcast/lets-be-honest-with-kristin-cavallari-t2lggjxmpl',
      coverUrl:
        'https://content.production.cdn.art19.com/images/6c/48/78/f0/6c4878f0-7c7b-4427-baf1-08f1d9eff292/7dab1a5edef3a65fcde5112df9257e4c0cd2c43fa8350b7015b6dc6e2f2bd0ec67f2ff129e9dd6cfdaf83312372a297ad4bda8578476b8b773c964a8e4315e6e.jpeg',
      showTitle: "Let's Be Honest with Kristin Cavallari",
      itunesAuthor: 'Dear Media',
      language: 'en',
      followed: false,
      explicit: null,
      itunesShowType: null,
      popularityScore: null,
      showDescription:
        "\\n      <p>Kristin Cavallari is back behind the microphone and more f*cking honest than ever. Let's Be Honest sets the record straight on everything from dating and relationships, nutrition and wellness, to what’s really going on behind those headlines. In her new lifestyle podcast, Cavallari dives into what connects people (and breaks them up), what makes people feel physically and spiritually healthy, and how to love yourself along the way. New episodes drop every Tuesday!</p>\\n    ",
      gmtLastUpdate: 1733212800000,
      categoryList: [
        {
          categoryId: '1324',
          categoryName: 'Society & Culture',
          categoryUrl: '/podcasts-categories/society-culture?categoryId=1324',
          children: null,
        },
      ],
    },
    {
      showId: 'i1si4n4nl5',
      showUrl: '/podcast/beautiful-stories-from-anonymous-people-i1si4n4nl5',
      coverUrl:
        'https://static.libsyn.com/p/assets/b/b/b/9/bbb94cd5624d4131e55e3c100dce7605/Beautiful_Anonymous_show_art27-20230802-vtfobec0ss.png',
      showTitle: 'Beautiful Stories From Anonymous People',
      itunesAuthor: 'Chris Gethard',
      language: 'en',
      followed: false,
      explicit: null,
      itunesShowType: null,
      popularityScore: null,
      showDescription:
        '1 phone call. 1 hour. No names. No holds barred. Thats the premise behind Beautiful Stories from Anonymous People, hosted by comedian Chris Gethard (the Chris Gethard Show, Broad City, This American Life, and one of Time Outs 10 best comedians of 2015). Every week, Chris opens the phone line to one anonymous caller, and he cant hang up first, no matter what. From shocking confessions and family secrets to philosophical discussions and shameless self-promotion, anything can and will happen! Theme song by Shellshag.',
      gmtLastUpdate: 1733223600000,
      categoryList: [
        {
          categoryId: '1324',
          categoryName: 'Society & Culture',
          categoryUrl: '/podcasts-categories/society-culture?categoryId=1324',
          children: null,
        },
      ],
    },
    {
      showId: '3uvxeau31y',
      showUrl: '/podcast/the-psychology-of-your-20s-3uvxeau31y',
      coverUrl:
        'https://www.omnycontent.com/d/programs/e73c998e-6e60-432f-8610-ae210140c5b1/bc44988a-a82a-4291-ab8b-afdd01187fa8/image.jpg?t=1684966583&size=Large',
      showTitle: 'The Psychology of your 20s',
      itunesAuthor: 'iHeartPodcasts',
      language: 'en',
      followed: false,
      explicit: null,
      itunesShowType: null,
      popularityScore: null,
      showDescription:
        '<p>A podcast that explains how everything is psychology. Even your 20s. Hosted by Jemma Sbeg, each Tuesday and Friday we deep dive into the science and psychology behind a topic, concept or universal experience that defines our 20s - from dating, to mental health, career anxiety, friendship, finances and all the growing pains associated with this decade. Listen now. </p>\\n<p> </p>\\n<p>For business enquires please email <a href="mailto:thepsychologyofyour20steam@unitedtalent.com">psychologyofyour20s@gmail.com</a></p>\\n<p>New merchandise here: <a href="https://the-psychology-of-your-20s.myshopify.com/">https://the-psychology-of-your-20s.myshopify.com/</a> </p>',
      gmtLastUpdate: 1733189803000,
      categoryList: [
        {
          categoryId: '1512',
          categoryName: 'Health & Fitness',
          categoryUrl: '/podcasts-categories/health-fitness?categoryId=1512',
          children: null,
        },
      ],
    },
    {
      showId: 'lh2b5v2xvy',
      showUrl: '/podcast/creepcast-lh2b5v2xvy',
      coverUrl:
        'https://megaphone.imgix.net/podcasts/b1b0677a-92c0-11ee-b8d5-dbd9b72c1979/image/5b2b0c381d325454209ee06f00089f27.jpg?ixlib=rails-4.3.1&max-w=3000&max-h=3000&fit=crop&auto=format,compress',
      showTitle: 'CreepCast',
      itunesAuthor: 'Wendigoon & MeatCanyon',
      language: 'en',
      followed: false,
      explicit: null,
      itunesShowType: null,
      popularityScore: null,
      showDescription: 'Wendigoon and MeatCanyon share the scary, occult, and...creepy stories from around the internet.',
      gmtLastUpdate: 1733076000000,
      categoryList: [
        {
          categoryId: '1324',
          categoryName: 'Society & Culture',
          categoryUrl: '/podcasts-categories/society-culture?categoryId=1324',
          children: null,
        },
      ],
    },
    {
      showId: '3im0egkcfb',
      showUrl: '/podcast/dateline-missing-in-america-3im0egkcfb',
      coverUrl:
        'https://image.simplecastcdn.com/images/8ba89b80-a681-4cd2-87bd-79a6315b0474/2e1a882c-a0af-43cf-9095-b5e98b0f191d/3000x3000/dl-missing-in-america-key-art-3000x3000.jpg?aid=rss_feed',
      showTitle: 'Dateline: Missing In America',
      itunesAuthor: 'NBC News',
      language: 'en',
      followed: false,
      explicit: null,
      itunesShowType: null,
      popularityScore: null,
      showDescription:
        'Are you the key to solving a mystery? That question is at the heart of this original series from Dateline. Correspondent Josh Mankiewicz reports on perplexing missing person cases brought to Dateline’s attention by our social media followers. Each episode focuses on one person’s story, as told by those left behind. Listen carefully to the details, descriptions and clues offered by family, friends and investigators. Something you hear might jog a memory that could help authorities crack a case.\\n \\nListen to all episodes of Dateline: Missing In America completely free, or subscribe to Dateline Premium to listen ad-free: DatelinePremium.com. Season 3 begins July 16, 2024.',
      gmtLastUpdate: 1726135200000,
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
      showId: 'pq0alaukxg',
      showUrl: '/podcast/relatable-with-allie-beth-stuckey-pq0alaukxg',
      coverUrl:
        'https://megaphone.imgix.net/podcasts/ed8d21e8-28d9-11ea-9eae-a38e16dd9819/image/Relatable_2023_FINAL.jpg?ixlib=rails-4.3.1&max-w=3000&max-h=3000&fit=crop&auto=format,compress',
      showTitle: 'Relatable with Allie Beth Stuckey',
      itunesAuthor: 'Blaze Podcast Network',
      language: 'en',
      followed: false,
      explicit: null,
      itunesShowType: null,
      popularityScore: null,
      showDescription:
        'Upbeat and in-depth, Relatable with Allie Beth Stuckey breaks down the latest in culture, news, theology & politics from a Christian, conservative perspective. Allie’s fresh analysis of the most important issues provides an entertaining and effective way to stay in the know.',
      gmtLastUpdate: 1733256000000,
      categoryList: [
        {
          categoryId: '1314',
          categoryName: 'Religion & Spirituality',
          categoryUrl: '/podcasts-categories/religion-spirituality?categoryId=1314',
          children: null,
        },
        {
          categoryId: '1489',
          categoryName: 'News',
          categoryUrl: '/podcasts-categories/news?categoryId=1489',
          children: null,
        },
      ],
    },
    {
      showId: 'jnucpihhfp',
      showUrl: '/podcast/handsome-jnucpihhfp',
      coverUrl:
        'https://content.production.cdn.art19.com/images/97/9f/fa/d5/979ffad5-2bf0-49ec-a93b-e91133304a52/bbaeea0d232c2f14a078ea251d85f14c0d32829487cad96957818fe21ea525c6c6a94d9f77ff50729fe597acc153ee359d2f21c45b129b4ffe08e9bb24ba5b19.jpeg',
      showTitle: 'Handsome',
      itunesAuthor: 'Headgum',
      language: 'en',
      followed: false,
      explicit: null,
      itunesShowType: null,
      popularityScore: null,
      showDescription:
        '\\n      <p>"Handsome" is a podcast from comedians Tig Notaro, Fortune Feimster, and Mae Martin. Every week, the handsome hosts field a question from a friend and attempt to answer it together, covering every subject you could think of. Along the way, Tig, Fortune and Mae tell plenty of stories and just generally have a ridiculous time.</p>\\n    ',
      gmtLastUpdate: 1733218200000,
      categoryList: [
        {
          categoryId: '1303',
          categoryName: 'Comedy',
          categoryUrl: '/podcasts-categories/comedy?categoryId=1303',
          children: null,
        },
      ],
    },
    {
      showId: 'uhc1alubak',
      showUrl: '/podcast/marketing-secrets-with-russell-brunson-uhc1alubak',
      coverUrl:
        'https://megaphone.imgix.net/podcasts/eede8e0c-f048-11ee-bf7f-5fe8d12a8b74/image/8a60dbc264747f6829ce612b48d7112b.png?ixlib=rails-4.3.1&max-w=3000&max-h=3000&fit=crop&auto=format,compress',
      showTitle: 'Marketing Secrets with Russell Brunson',
      itunesAuthor: 'Russell Brunson | YAP Media',
      language: 'en',
      followed: false,
      explicit: null,
      itunesShowType: null,
      popularityScore: null,
      showDescription:
        'Welcome to the Marketing Secrets with Russell Brunson! This show is for entrepreneurs and business owners who want to learn how to market in a way that lets us get our message, our products, and our services, out to the world… and yet still remain profitable. Learn from Russell Brunson, the world-famous internet marketer and a co-founder of the largest funnel creation software ClickFunnels. Russell shares his biggest “a-ha moments” and marketing secrets in each episode with complete transparency. From tough lessons learned, to mindset, to pure marketing strategy, Russell pulls you into his world and shares his personal journey and secrets to growing a business from $0 to $100,000,000 in just 3 years, with NO outside capital!',
      gmtLastUpdate: 1733133600000,
      categoryList: [
        {
          categoryId: '1321',
          categoryName: 'Business',
          categoryUrl: '/podcasts-categories/business?categoryId=1321',
          children: null,
        },
      ],
    },
    {
      showId: 'hof4hfeczm',
      showUrl: '/podcast/3-takeaways-hof4hfeczm',
      coverUrl: 'https://storage.buzzsprout.com/jht3xlwuwo7b5p9hxrs2db6dxooq?.jpg',
      showTitle: '3 Takeaways',
      itunesAuthor: 'Lynn Thoman',
      language: 'en',
      followed: false,
      explicit: null,
      itunesShowType: null,
      popularityScore: null,
      showDescription:
        '<p>3 Takeaways features insights from the world’s best thinkers, business leaders, writers, politicians, scientists and other newsmakers. Each episode ends with 3 key takeaways to help you understand the world in new ways that can benefit your life and career. Hosted by Lynn Thoman.</p>',
      gmtLastUpdate: 1733205600000,
      categoryList: [
        {
          categoryId: '1321',
          categoryName: 'Business',
          categoryUrl: '/podcasts-categories/business?categoryId=1321',
          children: null,
        },
      ],
    },
    {
      showId: '5b5trutr5c',
      showUrl: '/podcast/nobody-should-believe-me-5b5trutr5c',
      coverUrl:
        'https://megaphone.imgix.net/podcasts/91e9dfb2-a625-11ed-b83b-6f683fea0d52/image/NobodyShouldBelieveMe_Logo_FINAL3000x3000-20220921-bg4ps6q99f.jpg?ixlib=rails-4.3.1&max-w=3000&max-h=3000&fit=crop&auto=format,compress',
      showTitle: 'Nobody Should Believe Me',
      itunesAuthor: 'Nobody Should Believe Me ',
      language: 'en',
      followed: false,
      explicit: null,
      itunesShowType: null,
      popularityScore: null,
      showDescription:
        'Author Andrea Dunlop is looking for answers. When her older sister was first investigated for Munchausen by Proxy abuse more than a decade ago, it tore her family apart. This catastrophic series of events sent Dunlop on a journey to understand this most taboo form of abuse. In this groundbreaking podcast, she talks to some of the top experts in the world to explore the criminology and psychopathology behind Munchausen by Proxy and to reveal the wide swath of destruction these perpetrators leave in their wake. \\nIn each season, Dunlop investigates a case: speaking to friends, family members, doctors, law enforcement, child protection workers, and experts. Nobody Should Believe Me unravels these complex and terrifying stories, shedding light on an unspeakable crime. \\n"A rich and harrowing chronicle of the condition." --The New York Times\\n​ ​ (LM032423)',
      gmtLastUpdate: 1733238000000,
      categoryList: [
        {
          categoryId: '1324',
          categoryName: 'Society & Culture',
          categoryUrl: '/podcasts-categories/society-culture?categoryId=1324',
          children: null,
        },
        {
          categoryId: '1488',
          categoryName: 'True Crime',
          categoryUrl: '/podcasts-categories/true-crime?categoryId=1488',
          children: null,
        },
      ],
    },
    {
      showId: 'pun54hmzzv',
      showUrl: '/podcast/mrballen-s-medical-mysteries-pun54hmzzv',
      coverUrl:
        'https://content.production.cdn.art19.com/images/04/25/8a/a0/04258aa0-1104-457f-a375-fc0822bdc6da/44a703b82007639f1331135888138ac18ba2b28523febc27eee92789f67da592ad2dcfd12fc89d13eaa9aa4196139a838305b76a16845cfe40ccc18e27d3f4c0.jpeg',
      showTitle: 'MrBallen’s Medical Mysteries',
      itunesAuthor: 'Wondery',
      language: 'en',
      followed: false,
      explicit: null,
      itunesShowType: null,
      popularityScore: null,
      showDescription:
        "\\n      <p>The human body is a miracle. But when it’s not working, it can be the stuff of nightmares. On this new series from master storyteller MrBallen, we’re sharing medical horror stories and diagnostic mysteries that are surgically calibrated to make your blood run cold.</p><p><br></p><p>From bizarre, unheard-of diseases and miraculous recoveries to strange medical mishaps and unexplainable deaths — you’ll never hear the phrase “heart-stopping” in the same way again. MrBallen’s Medical Mysteries is a first-of-its-kind collaboration between MrBallen and Wondery, the award-winning company behind Dr. Death.</p><p><br></p><p>Follow MrBallen's Medical Mysteries on Amazon Music or wherever you get your podcasts. New episodes publish for free every Tuesday. Prime members can binge episodes 49 - 56 early and ad-free on Amazon Music.&nbsp;</p><p>Wondery+ subscribers can listen ad-free--join Wondery+ in the Wondery App or on Apple Podcasts.</p>\\n    ",
      gmtLastUpdate: 1733817660000,
      categoryList: [
        {
          categoryId: '1488',
          categoryName: 'True Crime',
          categoryUrl: '/podcasts-categories/true-crime?categoryId=1488',
          children: null,
        },
      ],
    },
  ]
  function toScroll(type: number) {
    const dom: any = domRef.current
    const scrollDom: any = scrollRef.current
    const scrollLeft = scrollDom?.scrollLeft
    const distance = dom?.offsetWidth * stepNum * (!!type ? 1 : -1)
    console.log(dom?.offsetWidth)
    scrollDom.scrollTo({
      left: scrollLeft + distance, // 目标高度，可以根据需求更改
      behavior: 'smooth', // 平滑滚动
    })
  }

  return (
    <div>
      <div className={` mb-[10px] text-md text-fontGry-600 ml-[90px] flex pt-[8px] items-center font-bold cursor-pointer`}>
        <Link href={`${urlObj[type]}`} className={`${styles.hoverBBorder} dark:text-white`}>
          {title}
        </Link>
        <ChevronRightIcon className={`ml-[10px] w-[20px] dark:text-white`} />
      </div>
      <div className={`flex items-center px-[20px]`}>
        <img
          src={`/images/landing/left-circle${isDark ? '-dark' : ''}.svg`}
          alt=""
          className={`cursor-pointer`}
          onClick={() => toScroll(0)}
        />
        <div className={`overflow-hidden flex-1 mx-[20px] bg-hbg dark:bg-bgDark rounded-[10px]`}>
          <div className={`p-[5px] overflow-auto flex flex-nowrap relative`} ref={scrollRef}>
            {resultList?.map((item: any, index: number) => (
              <Link
                href={item.showUrl}
                className={`p-[5px] shrink-0 hover:bg-homehbg dark:hover:bg-darkHomeBg rounded-[10px]`}
                ref={domRef}
                key={item?.showId}
              >
                <Image src={item.coverUrl} className={`w-[100px] h-[100px] rounded-[10px] shadow-cardShow`}></Image>
                <div className={`text-min text-fontGry-600 w-[100px] overflow-hidden text-ellipsis line-clamp-2 dark:text-white`}>
                  {item.showTitle}
                </div>
              </Link>
            ))}
          </div>
        </div>
        <img
          src={`/images/landing/right-circle${isDark ? '-dark' : ''}.svg`}
          alt=""
          className={`cursor-pointer`}
          onClick={() => toScroll(1)}
        />
      </div>
    </div>
  )
}
