'use client'
import { PlayCircleIcon, PauseIcon, SpeakerWaveIcon, SpeakerXMarkIcon } from '@heroicons/react/24/outline'
import { useEffect, useState, useRef } from 'react'
// import { Slider } from '@/components/ui/slider'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import Image from '@/app/ui/Image'
const volumeList: number[] = [0.5, 0.8, 1, 1.1, 1.2, 1.3, 1.5, 1.8, 2.0, 3.0]
import { useMyContext } from '@/context/MyContext'
import { getNoTagText, timeFormat } from '@/app/lib/utils'
import { useRouter } from 'next/navigation'
import { Loading } from '@/app/ui/home/loading'
import { audio_info } from '@/app/lib/config'
import { Slider } from 'antd'

export default function Audio() {
  const { data, setData, isPlaying, setIsPlaying, time, setTime, stepTime, setStepTime, allTime, setAllTime } = useMyContext()
  const {
    enclosureUrl = '',
    showTitle = '',
    showNotes = '',
    coverUrl = '',
    episodeTitle = '',
    episodeId = '',
    playTime = 0,
  }: any = data || {}
  const [playbackRate, setPlaybackRate] = useState(1)
  const [voice, setVoice] = useState(1)
  const [oldVoice, setOldVoice] = useState(1)
  const [loading, setLoading] = useState(false)
  const [hiddenNotes, setHiddenNotes] = useState(true)
  // const [isAudio, setIsAudio] = useState(null)
  let isAudio: any = useRef(null)
  const { push } = useRouter()
  const funs: any = { canplaythrough, timeupdate, loadstart, error, ended }
  // const newUrlAudio = enclosureUrl.includes('?') ? `${enclosureUrl}&t=${Date.now()}` : `${enclosureUrl}?t=${Date.now()}`
  useEffect(() => {
    const audioInfo = JSON.parse(sessionStorage.getItem(audio_info) || '{}')
    if (audioInfo?.episodeId) {
      setData(audioInfo)
      setTime(audioInfo?.playTime)
    }
  }, [])
  useEffect(() => {
    if (!enclosureUrl) return
    if (isAudio.current) {
      removeEvent()
      isAudio.current.pause()
      isAudio.current = null
    }
    isAudio.current = new (window.Audio as any)(enclosureUrl)
    if (playTime > 0) {
      isAudio.current.currentTime = playTime
    }
    addEvent()
    if (isPlaying) {
      isAudio.current.play()
    }
    return () => {
      if (isAudio.current) {
        // console.log('removeEvent', isPlaying)
        // removeEvent()
        // isAudio.current.pause()
        // isAudio.current = null
        // setTime(0)
      }
    }
  }, [enclosureUrl])
  useEffect(() => {
    if (isAudio.current) {
      if (isPlaying) {
        if (isAudio.current.paused) {
          isAudio.current.play()
        }
        if (stepTime > 0) {
          isAudio.current.currentTime = stepTime
          setStepTime(0)
        }
      } else {
        if (!isAudio.current.paused) {
          isAudio.current.pause()
        }
      }
    }
  }, [isPlaying, stepTime])
  function removeEvent() {
    if (isAudio)
      Object.keys(funs).forEach((item) => {
        isAudio.current.removeEventListener(item, funs[item])
      })
  }
  function addEvent() {
    if (isAudio)
      Object.keys(funs).forEach((item) => {
        isAudio.current.addEventListener(item, funs[item])
      })
  }
  function palyAudio() {
    const isPaused = isAudio.current.paused
    isPaused ? isAudio.current.play() : isAudio.current.pause()
    setIsPlaying(isPaused)
  }

  function changeProgress(val: any) {
    setTime(val)
    isAudio.current.currentTime = val
  }
  function changeVoice(val: any) {
    setVoice(val)
    isAudio.current.volume = val
  }
  function selectChange(val: number) {
    setPlaybackRate(val)
    isAudio.current.playbackRate = val
    console.log(val, playbackRate, '---')
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
  function ended() {
    setIsPlaying(false)
  }
  function error(err: any) {
    setIsPlaying(false)
    setLoading(false)
    throw new Error('播放失败')
  }
  function loadstart() {
    setLoading(true)
  }
  function canplaythrough() {
    const t = isAudio.current.duration
    setAllTime(parseInt(t))
    setLoading(false)
  }
  function timeupdate() {
    const t = isAudio.current.currentTime
    setTime(t)
    sessionStorage.setItem(audio_info, JSON.stringify({ ...data, playTime: t }))
    // loadRead()
  }
  function renderVoice() {
    const urlObj: any = {
      max: '/icons/volume-max.svg',
      medium: '/icons/volume-medium.svg',
      mute: '/icons/volume-mute.svg',
    }
    let type = 'medium'
    if (!voice) {
      type = 'mute'
    } else if (voice > 0.6) {
      type = 'max'
    } else type = 'medium'
    return <img src={urlObj[type]} alt="" className={`w-[24px] h-[24px] mr-[12px]`} onClick={closeViose} />
  }

  useEffect(() => {
    const domH: any = document.querySelector('.episodeTitle-line')
    const h = domH?.offsetHeight || 0
    setHiddenNotes(h > 20)
  }, [episodeTitle])
  return enclosureUrl ? (
    <div
      className={`w-[1200px] fixed left-[50%] translate-x-[-50%] bottom-0 bg-bgGray py-[6px] px-[35px] dark:bg-bgDark dark:text-gray-200 rounded-[10px] dark:border-[1px] dark:border-fontGry-600`}
    >
      <div className={`flex items-center`}>
        {/*<audio*/}
        {/*  src={enclosureUrl}*/}
        {/*  ref={isAudio}*/}
        {/*  className={`hidden`}*/}
        {/*  controls={true}*/}
        {/*  crossOrigin={'anonymous'}*/}
        {/*  onCanPlayThrough={loadRead}*/}
        {/*  onTimeUpdate={timeUpdate}*/}
        {/*  onEnded={palyEnd}*/}
        {/*  onError={playError}*/}
        {/*  onLoadStart={loadStart}*/}
        {/*>*/}
        {/*  <source src={`/17193_1461772397.mp3`} type={'audio/mpeg'} />*/}
        {/*  <source src={`/17193_1461772397.mp3`} type={'audio/ogg'} />*/}
        {/*  your browser does not support the audio element*/}
        {/*</audio>*/}
        <img
          src={`/images/${isPlaying ? 'playing' : 'paused'}.svg`}
          alt={'play'}
          title={'play'}
          className={`mr-[10px] cursor-pointer w-[34px] h-[34px]`}
          onClick={palyAudio}
        />
        <div className={`w-[400px] flex items-center`}>
          <span className={`mr-[10px] text-min`}>{timeFormat(time)}</span>
          <Slider
            tooltip={{ open: false }}
            value={time}
            defaultValue={time}
            step={1}
            max={allTime}
            min={0}
            className={`relative flex-1 flex items-center mr-[18px] m-0 p-0`}
            onChange={(e: any) => changeProgress(e)}
            range={false}
          />
          <span className={`mr-[20px] text-min`}>
            {loading ? (
              <img src="/images/loading.png" className={`w-[24px] h-[24px] animate-spin`} alt="" />
            ) : !!allTime ? (
              timeFormat(allTime)
            ) : (
              '--:--'
            )}
          </span>
        </div>
        {renderVoice()}
        <Slider
          tooltip={{ open: false }}
          max={1}
          min={0}
          step={0.01}
          className={`mr-[25px] w-[55px] flex items-center m-0 p-0 shrink-0`}
          value={voice}
          defaultValue={voice}
          onChange={(e: any) => changeVoice(e)}
        />
        <Select onValueChange={(e: any) => selectChange(e)} defaultValue={`${playbackRate}`} value={`${playbackRate}`}>
          <SelectTrigger className="w-auto bg-transparent border-0 p-0 shadow-none focus:ring-0 focus:ring-offset-0">
            <span
              className={`font-bold bg-gray-300 w-[82px] px-[8px] py-[2px] text-white text-min rounded-10px cursor-pointer dark:bg-fontGry-600 dark:text-homehbg`}
            >
              Speed {playbackRate}X
            </span>
          </SelectTrigger>
          <SelectContent>
            {volumeList.map((item: number) => {
              return (
                <SelectItem
                  value={`${item}`}
                  key={item}
                  className={`data-[state=checked]:bg-play data-[state=checked]:text-white text-center text-min`}
                >
                  {item}X
                </SelectItem>
              )
            })}
          </SelectContent>
        </Select>
        <div className={`flex ml-auto items-center cursor-pointer`} onClick={toEpisodeDetail}>
          <Image src={coverUrl} title={''} alt={''} className={`mr-[15px] rounded-[5px] w-[38px] h-[38px] object-cover`} />
          <div className={`flex-1`}>
            <div
              className={`episodeTitle-line w-[380px] text-[14px] text-fontGry-600 leading-[19px] overflow-hidden text-ellipsis line-clamp-2 dark:text-fontGry-100`}
            >
              {episodeTitle}
            </div>
            {!hiddenNotes && (
              <div
                className={`w-[380px] text-[14px] text-fontGry-600 leading-[19px] overflow-hidden text-ellipsis whitespace-nowrap dark:text-fontGry-100`}
              >
                {getNoTagText(showNotes)}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  ) : null
}
