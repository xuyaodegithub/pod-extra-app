import type { Metadata, Viewport } from 'next'
import { LoadingLine } from '@/app/ui/skeletons'
import { getMetaData } from '@/app/lib/utils'
import Link from 'next/link'
import fs from 'fs'
import path from 'path'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
export const metadata: Metadata = getMetaData()
import AcmeLogo from '@/app/ui/acme-logo'
import OtherLogo from '@/app/ui/other-logo'

export default function IndexPage() {
  const imagesDirectory = path.join(process.cwd(), 'public/images/imgWall')
  const filenames = fs.readdirSync(imagesDirectory).sort((a: string, b: string) => +a.split('.')[0] - +b.split('.')[0])
  const tools: any[] = [
    {
      img: '/images/overflow.svg',
      title: 'Overview',
      desc: 'PodExtra generates summaries with AI, enabling you to grasp the key content of any podcast in just minutes.',
    },
    {
      img: '/images/mindmap.svg',
      title: 'Mindmap',
      desc: 'Present podcast content in the form of mind maps to help you easily capture the overall structure and key points of the content.',
    },
    {
      img: '/images/listen.svg',
      title: 'Listen',
      desc: 'Listen to specific podcast content based on the transcription. Support listening by advancing or rewinding sentence by sentence.',
    },
    {
      img: '/images/transcript.svg',
      title: 'Transcript',
      desc: 'Accurate and comprehensive full transcripts of podcasts, supporting the distinction of speakers.',
    },
    {
      img: '/images/highlights.svg',
      title: 'Highlights',
      desc: "AI extracts the highlight quotes from podcast episode so that you won't miss the wonderful moments.",
    },
    {
      img: '/images/takeaways.svg',
      title: 'Takeaways',
      desc: 'Generate takeaways for your podcasts without having to listen to the entire content.\n',
    },
  ]
  const messageList = [
    [
      {
        message:
          ' This podcast tool is truly amazing!💥 With features like transcripts, summaries, mind maps and highlights, it makes podcast\n' +
          '            management a breeze. Enables quick identification of key moments and grasping of the gist. A must-have for podcast lovers. 😊',
        img: '/images/messageImg/img.svg',
        title: 'Dorota',
      },
      {
        message:
          'Not only has PodExtra enhanced my learning experience, but it has also made it more enjoyable. It is truly a must-have for anyone seeking to get the most out of their podcasts. 🎧🚀👍',
        img: '/images/messageImg/img (4).svg',
        title: 'Métal snake',
      },
    ],
    [
      {
        message: 'Thank you for all your help. Your service was excellent and very FAST.',
        img: '/images/messageImg/img (3).svg',
        title: 'Marton',
      },

      {
        message:
          "For those with a podcast habit, PodExtra is an absolute lifesaver. 🎧🆙 It's akin to having a personal editor for all one's favorite podcasts. I adore how it converts hours of content into quick and intelligent bytes! 🚀📚 The summaries are incisive, the highlights are accurate, and the mind maps are ingenious for visual learners.",
        img: '/images/messageImg/img (2).svg',
        title: 'Pamela',
      },
    ],
    [
      {
        message:
          "It's the Swiss Army knife for podcast lovers—efficient, practical, and a joy to use. No more sifting through hours of audio; I get the gems I need in a flash.",
        img: '/images/messageImg/img (5).svg',
        title: 'Md Setu Islam',
      },
      {
        message:
          'PodExtra is a phenomenal addition to the podcast toolkit. Its AI-driven transcriptions, summaries, and mind maps transform the way one engages with audio content. The ability to highlight key moments and quickly find info in the transcript is a lifesaver, especially for those short on time.',
        img: '/images/messageImg/img (6).svg',
        title: 'Thais Carballal',
      },
    ],
    [
      {
        message:
          'My podcast experience has been revolutionized by PodExtra! 🌟 Its AI-powered transcriptions are spot-on, and the ability to highlight and summarize episodes saves me hours.',
        img: '/images/messageImg/img (7).svg',
        title: 'Andrew',
      },
      {
        message:
          'This podcast tool is a lifesaver!💪 Transcripts, summaries, and mind maps simplify learning from podcasts. Highlights key moments for quick reference. 😃',
        img: '/images/messageImg/img (8).svg',
        title: 'Marcus Rodrigues',
      },
    ],
    [
      {
        message:
          "PodExtra has been an absolute game-changer for my podcast routine! 🎧💯 It's as if I have a dedicated curator for my favorite podcasts— the summaries are concise and on point, the highlights are spot-on, and the mind maps are a brilliant tool for those who learn visually. I'm really impressed with how it condenses hours of material into brief, insightful nuggets! 🚀📘",
        img: '/images/messageImg/img.png',
        title: 'JoJo',
      },
      {
        message:
          "Absolutely agree! This podcast tool is a godsend! 🌟 With transcripts, summaries, and mind maps at your fingertips, it's never been easier to absorb knowledge from podcasts. It expertly pinpoints key moments for effortless reference. 😁",
        img: '/images/messageImg/img_1.png',
        title: 'neko',
      },
    ],
  ]
  const QAList = [
    {
      q: 'What is PodExtra？',
      a: 'PodExtra is an innovative AI-powered podcast tool that provides transcripts, summaries, mind maps, outlines, highlights, and takeaways for your favorite podcasts. It allows you to quickly browse through the content, saving time and improving efficiency.',
    },
    {
      q: 'Who can use PodExtra？',
      a:
        'PodExtra can be used by anyone who enjoys listening to podcasts and is looking to enhance their listening experience with the following features:\n' +
        '1. Podcast Enthusiasts: People who regularly listen to multiple podcasts can use PodExtra to manage their subscriptions and discover new content.\n' +
        '2. Information Seekers: Individuals who want to quickly grasp the key points from podcast episodes without having to listen to hours of material will find the summaries and highlights useful.\n' +
        '3. Students and Researchers: Those who need to reference or study specific topics discussed in podcasts can benefit from the transcripts and outlines for detailed research.\n' +
        '4. Commuters and Multitaskers: People who listen to podcasts during their commute or while doing other tasks can use the mind maps and takeaways to quickly review the content later.\n' +
        '5. Visual Learners: Users who prefer visual representations of information can appreciate the mind maps that help organize and summarize podcast content.\n' +
        '6. Language Learners: Those learning a new language can use the transcripts to follow along with podcasts, helping them to improve their listening and comprehension skills.\n' +
        '7. Professionals: Busy professionals can use PodExtra to stay informed about industry news and trends by quickly accessing the most relevant parts of podcasts.\n' +
        '8. Accessibility Users: Individuals with hearing impairments or those who prefer reading over listening can use the transcripts to access podcast content.\n' +
        'In essence, PodExtra is designed for anyone who wants to make the most out of their podcast listening time by providing and efficient tools to navigate and understand podcast content better.',
    },
    {
      q: 'What podcast platform does PodExtra support？',
      a:
        'PodExtra is designed to support most podcast platforms available on the market, offering a comprehensive listening solution. With a vast collection of over 4 million podcast programs from around the world, we ensure that users can subscribe to and enjoy their favorite podcasts. PodExtra generally supports the following popular platforms:\n' +
        '1. Apple Podcasts: The default podcast platform for iOS users, it offers a broad selection of podcasts and a seamless listening experience.\n' +
        '2. Spotify: While renowned for its music streaming services, Spotify also features a diverse range of podcasts. Its recommendation algorithm helps users discover new and engaging content.\n' +
        "3. Google Podcasts: This platform leverages Google's powerful search capabilities, making it easy for users to find podcasts that match their interests. It offers a simple and intuitive listening interface.\n" +
        "For a complete list of supported platforms, users can refer to PodExtra's official documentation or website.",
    },
    {
      q: 'How can I  use PodExtra？',
      a:
        'To use PodExtra, you typically follow these general steps:\n' +
        'Open the website: First, you need to enter the URL (www.PodExtra.ai) into your browser (Chrome is recommended).\n' +
        'Create an account: Creating an account allows you to save your preferences, subscriptions, and personalization settings.\n' +
        'Search for podcasts: Use the search feature to find podcasts that interest you. You can search by show name, author, or topic, or browse categories to quickly find a podcast.\n' +
        'Subscribe: Once you find a podcast you like, you can subscribe to it. This typically adds the podcast to your personal listening queue.\n' +
        'Access Features: PodExtra offers the following features to enhance your podcast experience:\n' +
        '· Transcript: AI-generated transcripts that allow for easy reading or searching of episode content.\n' +
        "· Summary: Concise summaries that provide a quick overview of each episode's main points.\n" +
        '· Mindmap: Visual representations that outline the structure and flow of podcast content, helping you understand the organization of the episode.\n' +
        '· Highlights: Easily identifiable markers for key moments within episodes, allowing you to jump to important discussions or segments.\n' +
        "· Takeaways: Curated insights and key learnings from the podcast episodes, often including the host's or guest's most important points or actionable advice.\n" +
        "· Outlines: Detailed breakdowns of the episode's content, often presented in a bullet-point or numbered format, which can help you follow along or review the main topics and arguments discussed.\n" +
        "· Listen and engage: Start listening to the podcast. Use PodExtra's features to engage with the content, such as jumping to specific highlights or reading along with the text.\n" +
        'CUSTOMIZE SETTINGS: Adjust settings to your preferences, such as text update speed, topic selection, or new episode notifications. Look for the settings or preferences menu in the app or website.\n' +
        'EXPLORE RECOMMENDATIONS: Discover new content with recommendations based on your listening habits.\n' +
        'SHARE & DISCUSSION: Share your favorite podcasts or episodes with friends and join discussions on the PodExtra Community feature or social media platforms.',
    },
  ]
  const links = [
    {
      name: 'Popular Podcasts',
      href: '/popular-top-best-podcasts',
      icon: '/images/popular.svg',
      darkIcon: '/images/darkPopolar.svg',
    },
    { name: 'Latest Podcasts', href: '/new-latest-podcasts', icon: '/images/latest.svg', darkIcon: '/images/darkLatest.svg' },
    { name: 'Latest Episodes', href: '/new-latest-episodes', icon: '/images/latestE.svg', darkIcon: '/images/darkLatextE.svg' },
    {
      name: 'Latest AI-processed',
      href: '/latest-ai-processed-episodes',
      icon: '/images/latestAi.svg',
      darkIcon: '/images/darkLatextAi.svg',
    },
    { name: 'Categories', href: '/podcasts-categories', icon: '/images/cate.svg', darkIcon: '/images/darkCate.svg' },
  ]

  const otherLinks = [
    { title: 'EXPLORE', list: links.filter((i: any) => i.name !== 'Home') },
    {
      title: 'COMPANY',
      list: [
        // { name: 'Blog', href: '/' },
        // { name: 'Privacy policy', href: '/' },
        // { name: 'Sitemap', href: '/' },
        // { name: 'Email', href: '/' },
      ],
    },
    { title: 'FRIENDS', list: [] },
  ]
  // redirect('/home') // 重定向到 /home
  return (
    <main className={`landing`}>
      <div className={`w-1280 mx-auto`}>
        <div className={`flex justify-between pt-[24px] items-center mb-[124px]`}>
          <AcmeLogo />
          <Link href={'/home'} className={`text-md py-[10px] px-[16px] text-play bg-[#FFF0D7] rounded-[5px] font-bold dark:bg-bgDark`}>
            Get Started
          </Link>
        </div>
        <div className={`relative mb-[146px]`}>
          <h1
            className={`text-[80px] tracking-[-3px] text-[#02073E] w-[753px] mb-[30px] leading-[80px] dark:text-white`}
            style={{ fontFamily: 'Tilt Warp' }}
          >
            Unleash the power of podcast with AI
          </h1>
          <div className={`text-[30px] leading-[45px] mb-[30px] dark:text-homehbg`}>
            Transcripts, Summaries, Mind maps,
            <br /> Outlines, Highlights and Takeaways
          </div>
          <Link
            href={'/home'}
            className={`ml-[30px] text-[23px] inline-block leading-[40px] p-[10px]  text-white bg-play rounded-[5px] font-bold mb-[50px]`}
          >
            Get Started for free
          </Link>
          <div className={`flex text-md leading-[42px]`}>
            <span className={`mr-[17px]`}>Powered by:</span>
            <img src="/images/openai.svg" className={`mr-[26px] w-[40px] h-[40px]`} alt="" />
            <img src="/images/Podcast.svg" className={`mr-[26px] w-[40px] h-[40px]`} alt="" />
            <img src="/images/spotify.svg" className={`mr-[26px] w-[40px] h-[40px]`} alt="" />
          </div>
          <div className={`absolute right-0 top-0 w-[644px]`}>
            <img src="/images/people.png" alt="" />
          </div>
        </div>
        <div className={`mb-[84px]`}>
          <div className={`text-center text-[80px] leading-[80px] mb-[80px] tracking-[-3px]`} style={{ fontFamily: 'Tilt Warp' }}>
            <span className={`text-play`}>An advanced AI tool </span>for
            <div className={`text-[65px]`}>podcast listening and knowledge acquisition</div>
          </div>
          <div className={`flex flex-wrap justify-between`}>
            {tools.map((item: any, ind: number) => {
              const { title, desc, img } = item
              return (
                <div
                  key={ind}
                  className={`w-[420px] bg-[#F6F8FB] ${(ind + 1) % 3 === 0 ? '' : 'mr-[10px]'} mb-[30px] rounded-[8px] py-[22px] px-[26px] text-md leading-[32px] dark:bg-bgDark`}
                >
                  <div className={`flex mb-[15px]`}>
                    <img src={img} className={`w-[66px] h-[66px] mr-[22px]`} alt="" />
                    <h2 className={`text-[40px] leading-[1] self-end dark:text-white`}>{title}</h2>
                  </div>
                  <div className={`dark:text-homehbg`}>{desc}</div>
                </div>
              )
            })}
          </div>
        </div>
        <div className={`relative flex flex-wrap mb-[348px]`}>
          <div className={`w-[50%] mb-[146px]`}>
            <h2
              className={`text-[40px] leading-[50px] mb-[6px] space-x-[-1.5px] text-black dark:text-white tracking-[-1.5px]`}
              style={{ fontFamily: 'Tilt Warp' }}
            >
              Summarize podcasts with AI
            </h2>
            <div className={`text-[30px] leading-[45px] dark:text-homehbg`}>
              Generate podcast summaries with AI to quickly grasp the gist of the content before listening.
            </div>
          </div>
          <div className={`w-[50%] relative`}>
            <img src="/images/right-man.png" alt="" className={`absolute top-0 right-[50px] w-[300px]`} />
            <div className={`rounded-[10px] absolute left-0 top-[250px] w-[330px] bg-[#F6F8FB] py-[20px] px-[25px] dark:bg-bgDark`}>
              <h3
                className={`text-black  text-[26px] leading-[30px] pb-[15px] border-b-[1px] border-[#E0E2E4] mb-[15px] font-bold dark:border-darkHomeBg dark:text-homehbg`}
              >
                AI Summary
              </h3>
              <div className={`text-sm text-[#343D48] dark:text-fontGry-100`}>
                In this podcast episode, Dr. Koniver and Andrew Huberman dive into the fascinating world of peptides and growth hormone
                secretagogues, discussing their health implications and the need for personalized therapy and mindset for optimal
                well-being. They examine various compounds, including GLP-1 agonists, BPC-157, and NAD infusions, highlighting their unique
                benefits, safe sourcing, and practical uses. ......
              </div>
            </div>
          </div>
          <div className={`w-[50%] relative mb-[140px]`}>
            <img src="/images/left-man.png" alt="" className={`w-[300px] block`} />
            <div className={`rounded-[10px] absolute top-[230px] left-[88px] w-[325px] bg-[#F6F8FB] py-[20px] px-[25px] dark:bg-bgDark`}>
              <h3
                className={`text-black text-[26px] leading-[30px] pb-[15px] border-b-[1px] border-[#E0E2E4] mb-[15px] font-bold dark:border-darkHomeBg dark:text-homehbg`}
              >
                AI Transcript
              </h3>
              <div className={`text-sm text-[#343D48] leading-[24px] dark:text-fontGry-100`}>
                <span className={`text-play`}>Lex Fridman 13:47</span>
                <p>So Copilot was kind of like the first killer app for LLMs.</p>
                <span className={`text-play`}>SPEAKER_01 13:53</span>
                <p>Yeah. And like the beta was out in 2021. Right. </p>
                <span className={`text-play`}>Lex Fridman 13:55</span>
                <p>Okay. So what's the origin story of Cursor?</p>
                <span className={`text-play`}>SPEAKER_01 14:00</span>
                <p>
                  So around 2020, the scaling loss papers came out from OpenAI. And that was a moment where this looked like clear,
                  predictable progress for the field, where even if we didn't have any more ideas, it looked like you could make these
                  models a lot better if you had more compute and more data.
                </p>
                <span className={`text-play`}>Lex Fridman 14:15</span>
                <p>By the way, we'll probably talk for three to four hours on the topic of scaling loss. ......</p>
              </div>
            </div>
          </div>
          <div className={`w-[50%] relative mt-[386px]`}>
            <h3
              className={`text-[40px] leading-[50px] mb-[6px] space-x-[-1.5px] text-black dark:text-white`}
              style={{ fontFamily: 'Tilt Warp' }}
            >
              AI Podcast Transcript
            </h3>
            <div className={`text-[30px] leading-[45px] dark:text-homehbg`}>
              Accurate and comprehensive full transcripts of podcasts, supporting the distinction of speakers. You can listen while reading,
              or quickly jump to the corresponding position by clicking on the text.
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className={`w-1280 mx-auto text-center text-[30px] leading-[45px] mb-[30px]`}>
          <h1 className={`text-[80px] leading-[1] text-play tracking-[-2px]`} style={{ fontFamily: 'Tilt Warp' }}>
            10x Speed
          </h1>
          <h3 className={`text-[65px] leading-[80px] tracking-[-2px]`} style={{ fontFamily: 'Tilt Warp' }}>
            Gain knowledge from your favorite podcasts
          </h3>
          <p>Podcast fans, on average, consume over 8 episodes per week. </p>
          <p>However, globally there are more than 4 million shows available.</p>
        </div>
        <div className={`flex flex-wrap px-[100px]`}>
          {filenames.map((item: string) => (
            <img src={`/images/imgWall/${item}`} alt="" key={item} className={`w-[142px]`} />
          ))}
        </div>
      </div>
      <div className={`w-1280 flex items-center mx-auto text-[20px] leading-[60px] mb-[150px]`}>
        Enjoy Your Podcasts from：
        <img src="/images/speakBox/Podcast.svg" alt="" className={`mr-[14px]`} />
        <img src="/images/speakBox/spotify.svg" alt="" className={`mr-[14px]`} />
        <img src="/images/speakBox/rss.svg" alt="" className={`mr-[14px]`} />
        <img src="/images/speakBox/Vector.svg" alt="" className={`mr-[14px]`} />
      </div>
      <div className={`w-1280 mx-auto mb-[50px] text-center`}>
        <h1 className={`text-[65px] leading-[55px] font-bold`}>
          <span className={`text-play`}>Over 40,000</span> podcast lovers are using it
        </h1>
        <div className={`text-[26px] leading-[30px] mt-[10px]`}>Less time, more gains</div>
      </div>
      <div className={`relative overflow-hidden flex mb-[150px]`}>
        <div className={`flex items-start animate-scroll-x`}>
          {messageList.map((it, index) => {
            return (
              <div key={index}>
                {it.map((item, ind) => {
                  return (
                    <div
                      className={`py-[14px] px-[34px] bg-[#FFFCF7] w-[480px] rounded-[5px] mr-[20px] mb-[20px] dark:bg-bgDark dark:text-homehbg`}
                      key={index + '-' + ind}
                    >
                      <div className={`text-md leading-[30px] mb-[15px]`}>{item.message}</div>
                      <div className={`flex justify-between items-center`}>
                        <div className={`flex items-center`}>
                          <img src={item.img} alt="" className={`w-[45px] h-[45px] object-cover mr-[15px] rounded-[50%]`} />
                          <div className={`max-w-[100px] overflow-hidden text-ellipsis whitespace-nowrap font-bold`}>{item.title}</div>
                        </div>
                        <div className={`flex items-center`}>
                          {Array.from({ length: 5 }).map((i, ind) => (
                            <img src="/images/messageImg/shoucang.svg" alt="" key={ind} className={`mr-[8px]`} />
                          ))}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            )
          })}
          {messageList.map((it, index) => {
            return (
              <div key={index}>
                {it.map((item, ind) => {
                  return (
                    <div
                      className={`py-[14px] px-[34px] bg-[#FFFCF7] w-[480px] rounded-[5px] mr-[20px] mb-[20px] dark:bg-bgDark dark:text-homehbg`}
                      key={index + '-' + ind}
                    >
                      <div className={`text-md leading-[30px] mb-[15px]`}>{item.message}</div>
                      <div className={`flex justify-between items-center`}>
                        <div className={`flex items-center`}>
                          <img src={item.img} alt="" className={`w-[45px] h-[45px] object-cover mr-[15px] rounded-[50%]`} />
                          <div className={`max-w-[100px] overflow-hidden text-ellipsis whitespace-nowrap font-bold`}>{item.title}</div>
                        </div>
                        <div className={`flex items-center`}>
                          {Array.from({ length: 5 }).map((i, ind) => (
                            <img src="/images/messageImg/shoucang.svg" alt="" key={ind} className={`mr-[8px]`} />
                          ))}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            )
          })}
        </div>
      </div>
      <div className={`w-1280 mx-auto mb-[190px]`}>
        <h1 className={`text-black text-[68px] text-center font-black mb-[65px] dark:text-white`}>Frequently Asked Questions</h1>
        <div className={`w-[880px] mx-auto`}>
          <Accordion type="single" collapsible defaultValue={'item-1'} className={`dark:bg-bgDark`}>
            {QAList.map((it, index) => (
              <AccordionItem value={`item-${index + 1}`} key={index} className={`mb-[15px] border-[1px]  rounded-[10px] border-[#D9D9D9]`}>
                <AccordionTrigger
                  className={`text-lg font-bold p-[20px] data-[state=closed]:bg-[#f5f5f5] dark:data-[state=closed]:bg-bgDark rounded-[10px]`}
                >
                  {it.q}
                </AccordionTrigger>
                <AccordionContent className={`text-sm px-[20px]`}>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: it.a.replace(/\n/g, '<br/>').replace(/·/g, '<span style="font-size: 20px;font-weight: 700;">·</span>'),
                    }}
                  ></div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
      <div className={`w-1280 mx-auto p-[32px] flex items-start mb-[110px]`}>
        <OtherLogo />
        {otherLinks.map((item: any) =>
          !!item.list.length ? (
            <div className={`w-[260px] text-md`}>
              <h3 className={` font-bold mb-[30px] dark:text-homehbg`}>{item.title}</h3>
              {item.list.map((item: any) => (
                <div className={`mb-[15px] dark:text-fontGry-100`}>
                  <Link href={item.href}>{item.name}</Link>
                </div>
              ))}
            </div>
          ) : null
        )}
      </div>
      <div className={`bg-play`}>
        <div className={`w-1280 mx-auto py-[18px] flex`}>
          <img src="/images/bottomLogo.svg" alt="" className={`mr-[42px]`} />
          <div className={`text-sm text-white`}>Copyright by 2024 PodExtra, Inc</div>
        </div>
      </div>
    </main>
  )
}
