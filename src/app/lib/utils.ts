export const POPULARITY = 'POPULARITY'
export const PUB_DATE = 'PUB_DATE'
export const TRANSCRIPT_TIME = 'TRANSCRIPT_TIME'
export const SUMMARIZE_TIME = 'SUMMARIZE_TIME'
export const generatePagination = (currentPage: number, totalPages: number) => {
  // If the total number of pages is 7 or less,
  // display all pages without any ellipsis.
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1)
  }

  // If the current page is among the first 3 pages,
  // show the first 3, an ellipsis, and the last 2 pages.
  if (currentPage <= 3) {
    return [1, 2, 3, '...', totalPages - 1, totalPages]
  }

  // If the current page is among the last 3 pages,
  // show the first 2, an ellipsis, and the last 3 pages.
  if (currentPage >= totalPages - 2) {
    return [1, 2, '...', totalPages - 2, totalPages - 1, totalPages]
  }

  // If the current page is somewhere in the middle,
  // show the first page, an ellipsis, the current page and its neighbors,
  // another ellipsis, and the last page.
  return [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages]
}
export const timeFormatter = (val: any, type: string) => {
  const time = new Date(val)
  const y = time.getFullYear()
  const m = time.getMonth() + 1
  const d = time.getDay()
  const h = time.getHours()
  const min = time.getMinutes()
  const s = time.getSeconds()
  return
}

export const formatTime = function (date: any, mode: any) {
  if (!date) {
    return ''
  }
  const d0 = new Date(0)
  const d1 = new Date('1970/01/01 08:00:00')
  // eslint-disable-next-line no-param-reassign
  date = parseInt(date) + (d1.getTime() - d0.getTime()) / 1000
  const d = new Date(parseInt(date) * 1000)
  let format = mode
  const o = {
    'M+': d.getMonth() + 1, // month
    'd+': d.getDate(), // day
    'h+': d.getHours(), // hour
    's+': d.getSeconds(), // second
    'm+': d.getMinutes(), // minute
    'q+': Math.floor((d.getMonth() + 3) / 3), // quarter
    S: d.getMilliseconds(), // millisecond
  }
  if (/(y+)/.test(format)) {
    format = format.replace(RegExp.$1, `${d.getFullYear()}`.substr(4 - RegExp.$1.length))
  }
  for (const k in o) {
    if (new RegExp(`(${k})`).test(format)) {
      // @ts-ignore
      format = format.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : `00${o[k]}`.substr(`${o[k]}`.length))
    }
  }

  return format
}
export function getCurrentLocalTime(val: any, needHour: boolean = false): string {
  if (!val) return '-'
  // 获取当前日期
  const now = new Date(val)

  // 使用 Intl.DateTimeFormat 获取日期部分
  const formatter = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  })

  // 格式化后的日期字符串
  const parts = formatter.formatToParts(now)
  let day = ''
  let month = ''
  let year = ''
  let hour = ''
  let minute = ''
  let second = ''

  // 找到并提取 day, month 和 year
  for (const part of parts) {
    switch (part.type) {
      case 'second':
        second = part.value.padStart(2, '0')
        break
      case 'minute':
        minute = part.value.padStart(2, '0')
        break
      case 'hour':
        hour = part.value.padStart(2, '0')
        break
      case 'day':
        day = part.value.padStart(2, '0')
        break
      case 'month':
        month = part.value.padStart(2, '0')
        break
      case 'year':
        year = part.value
        break
    }
  }

  // 组合成 dd/MM/yyyy 格式
  // const formattedDateTime = `${day}/${month}/${year}`
  const formattedTime = needHour ? `${hour}:${minute}:${second}` : `${day}/${month}/${year}`
  return formattedTime
}
export const getNoTagText = (val: string) => {
  return val.replace(/<[^>]*>/g, '')
}
export function capitalizeFirstLetter(str: string) {
  return str.replace(/\b\w/g, (char) => char.toUpperCase())
}
export function timeFormat(t: number, hash?: boolean) {
  const h = Math.floor(t / 3600)
  const m = Math.floor((t % 3600) / 60)
  const s = Math.floor(t % 60)
  const hh = h > 9 ? h : h === 0 ? '' : '0' + h
  return !hash
    ? `${hh ? `${hh}:` : ''}${m > 9 ? m : '0' + m}:${s > 9 ? s : '0' + s}`
    : `${hh ? `${hh}:` : '00:'}${m > 9 ? m : '0' + m}:${s > 9 ? s : '0' + s}`
}
export function getMetaData(data?: any) {
  return {
    title: {
      template: '%s',
      default: 'PodExtra AI—Unleash the power of podcast',
    },
    description:
      'PodExtra is an innovative AI-powered podcast tool that provides transcripts, summaries, mind maps, outlines, highlights, and takeaways for your favorite podcasts. It allows you to quickly browse through the content, saving time and improving efficiency.',
    icons: {
      icon: '/images/favicon.png',
    },
    keywords:
      'podcast,podcast summaries,podcast transcripts, AI transcription,podcast tool,mind maps,outlines, highlights,takeaways,favorite podcasts,',
    ...data,
  }
}
