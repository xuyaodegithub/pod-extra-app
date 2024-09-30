'use client'
import { PlayCircleIcon, PauseIcon, SpeakerWaveIcon, SpeakerXMarkIcon } from '@heroicons/react/24/outline'
import { useEffect, useState, useRef } from 'react'
import { Slider } from '@/components/ui/slider'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import Image from 'next/image'
const volumeList: number[] = [0.5, 0.8, 1, 1.1, 1.3, 1.5, 1.8, 2.0, 3.0]
export default function Audio() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [time, setTime] = useState(0)
  const [allTime, setAllTime] = useState(1000)
  const [playbackRate, setPlaybackRate] = useState(1)
  const [voice, setVoice] = useState(1)
  const [oldVoice, setOldVoice] = useState(1)
  const [coverImg, setCoverImg] = useState(
    'https://content.production.cdn.art19.com/images/75/d9/fa/6b/75d9fa6b-10e8-45e3-9a9d-0cfebd39cd47/6bd37aa60a35dc4a942bdb35d4132ecdb2479f4e8e4863e9eeb5b13b64f1046eac297f5d874cb1585636dd11a508c652acc2a0bc3278d985918125123e0e6626.jpeg'
  )
  const isAudio: any = useRef(null)

  function palyAudio() {
    const isPaused = isAudio.current.paused
    isPaused ? isAudio.current.play() : isAudio.current.pause()
    setIsPlaying(isPaused)
  }
  function loadRead() {
    const t = isAudio.current.duration
    setAllTime(parseInt(t))
  }
  function timeUpdate() {
    const t = isAudio.current.currentTime
    setTime(t)
    loadRead()
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
  function timeFormat(t: number) {
    const m = Math.floor(t / 60)
    const s = Math.floor(t % 60)
    return `${m > 9 ? m : '0' + m}:${s > 9 ? s : '0' + s}`
  }
  return (
    <div className={`group fixed left-0 bottom-0 w-[100%] bg-bgGray py-[20px] px-[35px]`}>
      <div className={`flex items-center w-1280 mx-auto`}>
        <audio
          src="/17193_1461772397.mp3"
          ref={isAudio}
          className={`hidden`}
          controls={true}
          crossOrigin={'anonymous'}
          onCanPlayThrough={loadRead}
          onTimeUpdate={timeUpdate}
          onEnded={palyEnd}
        >
          <source src={`/17193_1461772397.mp3`} type={'audio/mpeg'} />
          <source src={`/17193_1461772397.mp3`} type={'audio/ogg'} />
          your browser does not support the audio element
        </audio>
        {isPlaying ? (
          <Image
            src={`/images/playing.svg`}
            width={38}
            height={38}
            alt={'play'}
            title={'play'}
            className={`mr-[10px]`}
            onClick={palyAudio}
          />
        ) : (
          <Image
            src={`/images/paused.svg`}
            width={38}
            height={38}
            alt={'paused'}
            title={'paused'}
            className={`mr-[10px]`}
            onClick={palyAudio}
          />
        )}
        <span className={`mr-[10px]`}>{timeFormat(time)}</span>
        <Slider
          value={[time]}
          defaultValue={[time]}
          step={1}
          max={allTime}
          className={`w-[310px] mr-[18px]`}
          onValueChange={(e: any) => changeProgress(e)}
        />
        <span className={`mr-[20px]`}>{timeFormat(allTime)}</span>
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
            <span className={`font-bold bg-gray-300 text-white px-[8px] py-[2px] text-min rounded-10px cursor-pointer`}>
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
        <div className={`flex ml-auto items-center`}>
          <img src={coverImg} title={''} alt={''} className={`mr-[10px] rounded-[5px] w-[50px] h-[50px] object-cover`} />
          <div className={`w-[390px]`}>
            <div className={`text-[14px] text-fontGry-100 leading-normal`}>Huberman Lab Podcast</div>
            <div className={`text-[14px] text-fontGry-600 leading-normal overflow-hidden text-ellipsis line-clamp-2`}>
              Glucose Goddess: The Alarming New Truth About Grapes! These 10 Hacks To Strip Fat Without Exercise...
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
