'use client'
import { getNoTagText, timeFormat } from '@/app/lib/utils'
import { useEffect } from 'react'
import { useMyContext } from '@/context/MyContext'

export function Shownotes({ data, goThisTime }: { data: any; goThisTime?: any }) {
  const { enclosureUrl = '', showTitle = '', showNotes = '', coverUrl = '', episodeTitle = '', episodeId = '', duration } = data || {}
  const audioInfo = { enclosureUrl, showTitle, showNotes, coverUrl, episodeTitle, episodeId }
  const { setData, setIsPlaying, setStepTime } = useMyContext()

  function timeToSeconds(timeStr: string) {
    const regex = /^(?:(\d{1,2}):)?(\d{2})(?::(\d{2}))?$/ // 更新的正则表达式
    const match = timeStr.match(regex)

    if (!match) {
      throw new Error('Invalid time format')
    }
    const [h, m, s]: any = [match[3] ? match[1] : 0, match[3] ? match[2] : match[1], match[3] || match[2]]

    return parseInt(h) * 3600 + parseInt(m) * 60 + parseInt(s) // 转换为秒
  }
  function clickSpan(e: any) {
    console.log(e.target, '--')
    const el: any = e.target
    if (el.classList.contains('clickable')) {
      const timeStr = el.getAttribute('data-val')
      const s = timeToSeconds(timeStr)
      console.log(s, 'pp')
      if (s > duration) return
      setData(audioInfo)
      setTimeout(() => {
        setIsPlaying(true)
        setStepTime(s + 0.1)
      }, 500)
    }
  }
  function replaceLinksWithAnchors(text: string) {
    // 1. 临时替换所有已经存在的 <a> 标签为占位符
    const placeholders: any = {}
    let placeholderCounter = 0

    // 替换所有现有的 <a> 标签为占位符，并保留 href、class、target 等属性
    text = text.replace(/<a\s+([^>]*href=["'][^"']*["'][^>]*?)>/g, (match, p1) => {
      const placeholder = `{{link${placeholderCounter++}}}`
      placeholders[placeholder] = match // 保存占位符对应的原始链接
      return placeholder
    })

    // 2. 将未被 <a> 标签包裹的 URL 转换为 <a> 标签
    // 确保未包裹的 URL 被替换为 <a> 标签，并加上 target="_blank" 和 class="text-play"
    text = text.replace(/(?<!<a\s+[^>]*?>)(https?:\/\/[^\s<]+)(?![^<]*<\/a>)/g, (url) => {
      return `<a href="${url}" target="_blank" class="text-play">${url}</a>`
    })

    // 3. 处理 mailto 链接，确保它们也有 target="_blank" 和 class="text-play"
    text = text.replace(
      /<a\s+([^>]*href=["']mailto:[^"']*["'][^>]*)(?!target=["']_blank["'])>/g,
      '<a $1 target="_blank" class="text-play">'
    )

    // 4. 将时间格式替换为带有点击效果的 span 标签
    text = text.replace(/\b(\d{1,2}):(\d{2})(?::(\d{2}))?\b/g, `<span class="clickable cursor-pointer text-play" data-val="$&">$&</span>`)

    // 5. 将换行符 (\n) 替换为 <br /> 标签
    text = text.replace(/\n/g, '<br />')

    // 6. 恢复占位符为原始的 <a> 标签
    for (const placeholder in placeholders) {
      text = text.replace(placeholder, placeholders[placeholder])
    }

    return text
  }
  function modifyLinks(input: string) {
    // 正则匹配所有 <a> 标签及其属性
    const aTagRegex = /<a([^>]+)>/g

    const output = input.replace(aTagRegex, (match, attributes) => {
      // 移除非 href 的属性
      const hrefMatch = attributes.match(/href=["'][^"']+["']/)
      console.log('hrefMatch', hrefMatch, attributes)
      const href = hrefMatch ? hrefMatch[0] : attributes
      // 为每个 <a> 标签添加 target="_blank" rel="nofollow" class="text-play" 属性
      const newAttributes = `${href} target="_blank" rel="nofollow" class="text-play"`

      // 构建新的 <a> 标签
      return `<a ${newAttributes}>`
    })

    return output
  }
  function convertLinksToAnchors(input: string) {
    // 正则匹配非 a 标签内的超链接文本
    const urlRegex = /(?:^|\s)(https?:\/\/[^\s<>"']+)/g

    const output = input.replace(urlRegex, (match, url) => {
      // 将匹配到的链接转换为 <a> 标签，并添加属性
      const anchorTag = `<a href="${url}" target="_blank" rel="nofollow" class="text-play">${url}</a>`
      return ` ${anchorTag}` // 保持原始空格格式
    })

    return output
  }
  useEffect(() => {
    const box: any = document.querySelector('.ShownotesBox')
    console.log(showNotes)
    box.innerHTML = convertLinksToAnchors(modifyLinks(showNotes))
    //   .replace(
    //   /<a\s+([^>]*?href=["'][^"']*["'][^>]*)(?<!target=["']_blank["'][^>]*)(?<!class=["'][^"']*text-play["'][^>]*)([^>]*?)>/g,
    //   (match, attrs, existingAttrs) => {
    //     // 确保每个<a>标签都加上 target="_blank" 和 class="text-play"
    //     return `<a ${attrs} target="_blank" rel="nofollow" class="text-play"${existingAttrs}>`
    //   }
    // )
  }, [showNotes])
  return (
    <div key="Shownotes">
      <div className={`text-min text-homehbg pb-[12px] border-b-[1px] border-e8e mb-[15px] dark:text-fontGry-100 dark:border-fontGry-600`}>
        Shownotes are provided by podcaster, not generated by AI.
      </div>
      <div className={`text-md text-fontGry-600 dark:text-homehbg ShownotesBox`} onClick={(e) => clickSpan(e)}></div>
    </div>
  )
}
