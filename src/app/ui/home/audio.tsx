'use client'
import { PlayCircleIcon, PauseIcon, SpeakerWaveIcon, SpeakerXMarkIcon } from '@heroicons/react/24/outline'
import { useEffect, useState, useRef } from 'react'
import { Slider } from '@/components/ui/slider'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import Image from 'next/image'
const volumeList: number[] = [0.5, 0.8, 1, 1.1, 1.3, 1.5, 1.8, 2.0, 3.0]
import { useMyContext } from '@/context/MyContext'
import { getNoTagText, timeFormat } from '@/app/lib/utils'
import { useRouter } from 'next/navigation'
import { Loading } from '@/app/ui/home/loading'

export default function Audio() {
  const { data, setData, isPlaying, setIsPlaying, time, setTime, stepTime, setStepTime } = useMyContext()
  const { enclosureUrl = '', showTitle = '', showNotes = '', coverUrl = '', episodeTitle = '', episodeId = '' } = data || {}
  const [allTime, setAllTime] = useState(0)
  const [playbackRate, setPlaybackRate] = useState(1)
  const [voice, setVoice] = useState(1)
  const [oldVoice, setOldVoice] = useState(1)
  const [loading, setLoading] = useState(false)
  const isAudio: any = useRef(null)
  const { push } = useRouter()
  // const newUrlAudio = enclosureUrl.includes('?') ? `${enclosureUrl}&t=${Date.now()}` : `${enclosureUrl}?t=${Date.now()}`
  useEffect(() => {
    if (isPlaying) {
      const isPaused = isAudio.current.paused
      if (isPaused) isAudio.current.play()
      if (stepTime > 0) {
        isAudio.current.currentTime = stepTime
        setStepTime(0)
      }
    } else {
      if (!enclosureUrl) return
      const isPaused = isAudio.current?.paused
      if (!isPaused) isAudio.current.pause()
    }
  }, [isPlaying, enclosureUrl, stepTime])
  function palyAudio() {
    const isPaused = isAudio.current.paused
    isPaused ? isAudio.current.play() : isAudio.current.pause()
    setIsPlaying(isPaused)
  }
  function loadRead() {
    const t = isAudio.current.duration
    setAllTime(parseInt(t))
    setLoading(false)
  }
  function timeUpdate() {
    const t = isAudio.current.currentTime
    setTime(t)
    // loadRead()
  }
  function changeProgress(val: any) {
    setTime(val[0])
    isAudio.current.currentTime = val[0]
  }
  function changeVoice(val: any) {
    setVoice(val[0])
    isAudio.current.volume = val[0]
  }
  function selectChange(val: number) {
    setPlaybackRate(val)
    isAudio.current.playbackRate = val
    console.log(val, playbackRate, '---')
  }
  function palyEnd() {
    setIsPlaying(false)
  }
  function closeViose() {
    const v = isAudio.current.volume
    if (v > 0) {
      setOldVoice(voice)
      setVoice(0)
    } else {
      setVoice(oldVoice)
    }
    isAudio.current.volume = v > 0 ? 0 : oldVoice
  }
  function toEpisodeDetail() {
    push(`/episode/${encodeURIComponent(episodeTitle.replace(/\-/g, '_'))}-${episodeId}`)
  }
  function playError(err: any) {
    setIsPlaying(false)
    setLoading(false)
    throw new Error('播放失败')
  }
  function loadStart() {
    setLoading(true)
    console.log('start')
  }
  return enclosureUrl ? (
    <div className={`fixed left-0 bottom-0 w-[100%] bg-bgGray py-[9px] px-[35px] dark:bg-bgDark dark:text-gray-200`}>
      <div className={`flex items-center w-1280 mx-auto`}>
        <audio
          src={enclosureUrl}
          ref={isAudio}
          className={`hidden`}
          controls={true}
          crossOrigin={'anonymous'}
          onCanPlayThrough={loadRead}
          onTimeUpdate={timeUpdate}
          onEnded={palyEnd}
          onError={playError}
          onLoadStart={loadStart}
        >
          <source src={`/17193_1461772397.mp3`} type={'audio/mpeg'} />
          <source src={`/17193_1461772397.mp3`} type={'audio/ogg'} />
          your browser does not support the audio element
        </audio>
        <Image
          src={`/images/${isPlaying ? 'playing' : 'paused'}.svg`}
          width={38}
          height={38}
          alt={'play'}
          title={'play'}
          className={`mr-[10px] cursor-pointer`}
          onClick={palyAudio}
        />
        <span className={`mr-[10px]`}>{timeFormat(time)}</span>
        <Slider
          value={[time]}
          defaultValue={[time]}
          step={1}
          max={allTime}
          className={`w-[310px] mr-[18px]`}
          onValueChange={(e: any) => changeProgress(e)}
        />
        <span className={`mr-[20px]`}>{loading ? <Loading /> : !!allTime ? timeFormat(allTime) : '--:--'}</span>
        {voice > 0 ? (
          <SpeakerWaveIcon className={`w-[24px] h-[24px] text-gray-200 mr-[12px]`} onClick={closeViose} />
        ) : (
          <SpeakerXMarkIcon className={`w-[24px] h-[24px] text-gray-200 mr-[12px]`} onClick={closeViose} />
        )}
        <Slider
          max={1}
          min={0}
          step={0.01}
          className={`mr-[25px] w-[150px]`}
          value={[voice]}
          defaultValue={[voice]}
          onValueChange={(e: any) => changeVoice(e)}
        />
        <Select onValueChange={(e: any) => selectChange(e)} defaultValue={`${playbackRate}`} value={`${playbackRate}`}>
          <SelectTrigger className="w-auto bg-transparent border-0 shadow-none focus:ring-0 focus:ring-offset-0">
            <span
              className={`font-bold bg-gray-300 px-[8px] py-[2px] text-white text-min rounded-10px cursor-pointer dark:bg-fontGry-600 dark:text-homehbg`}
            >
              Speed {playbackRate}X
            </span>
          </SelectTrigger>
          <SelectContent>
            {volumeList.map((item: number) => {
              return (
                <SelectItem value={`${item}`} key={item} className={`data-[state=checked]:bg-play data-[state=checked]:text-white`}>
                  {item}X
                </SelectItem>
              )
            })}
          </SelectContent>
        </Select>
        <div className={`flex ml-auto items-center cursor-pointer`} onClick={toEpisodeDetail}>
          <img src={coverUrl} title={''} alt={''} className={`mr-[10px] rounded-[5px] w-[50px] h-[50px] object-cover`} />
          <div className={`w-[390px]`}>
            <div className={`text-[14px] text-fontGry-100 leading-normal dark:text-white`}>{showTitle}</div>
            <div className={`text-[14px] text-fontGry-600 leading-normal overflow-hidden text-ellipsis line-clamp-2 dark:text-fontGry-100`}>
              {getNoTagText(showNotes)}
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : null
}
