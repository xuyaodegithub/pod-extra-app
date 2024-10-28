'use client'
import React, { useState, useRef, useEffect } from 'react'
import { Markmap } from 'markmap-view'
import { transformer } from '@/app/lib/markMap'
import { Toolbar } from 'markmap-toolbar'
import 'markmap-toolbar/dist/style.css'

const initValue = `
## Links

- [Website](https://markmap.js.org/)
- [GitHub](https://github.com/gera2ld/markmap)

## Related Projects

- [coc-markmap](https://github.com/gera2ld/coc-markmap) for Neovim
- [markmap-vscode](https://marketplace.visualstudio.com/items?itemName=gera2ld.markmap-vscode) for VSCode
- [eaf-markmap](https://github.com/emacs-eaf/eaf-markmap) for Emacs

## Features

Note that if blocks and lists appear at the same level, the lists will be ignored.
`

function renderToolbar(mm: Markmap, wrapper: HTMLElement) {
  while (wrapper?.firstChild) wrapper.firstChild.remove()
  if (mm && wrapper) {
    const toolbar = new Toolbar()
    toolbar.attach(mm)
    // Register custom buttons
    // toolbar.register({
    //   id: 'alert',
    //   title: 'Click to show an alert',
    //   content: 'Alert',
    //   onClick: () => alert('You made it!'),
    // })
    // toolbar.setItems([...Toolbar.defaultItems, 'alert'])
    wrapper.append(toolbar.render())
  }
}

export default function MarkmapHooks({ mindmapInMd }: { mindmapInMd: any }) {
  const [value, setValue] = useState(mindmapInMd)
  // Ref for SVG element
  const refSvg = useRef<any>(null)
  // Ref for markmap object
  const refMm = useRef<Markmap>()
  // Ref for toolbar wrapper
  const refToolbar = useRef<any>(null)
  function addLevelMarkers(markdown: any) {
    return markdown
      .split('\n')
      .map((line: any) => {
        const indentLevel = line.match(/^\s*/)[0].length / 4 // 假设每个层级使用 4 个空格
        const cleanedLine = line.trim()
        return `${' '.repeat(indentLevel * 4)}${cleanedLine} <!-- .level${indentLevel + 1} -->`
      })
      .join('\n')
  }

  function setFoldedByLevel(node: any, maxExpandedLevel = 2, currentLevel = 1) {
    if (currentLevel > maxExpandedLevel) {
      node.state = { ...node.state, expanded: false } // 超过最大展开层级的节点将被折叠
    } else {
      node.state = { ...node.state, expanded: true }
    }
    if (node.children) {
      node.children.forEach((child: any) => setFoldedByLevel(child, maxExpandedLevel, currentLevel + 1))
    }
  }
  // 初始化 Markmap，并设置默认折叠
  useEffect(() => {
    // Create markmap and save to refMm
    if (refMm.current) return
    const mm = Markmap.create(refSvg.current)
    refMm.current = mm
    renderToolbar(refMm.current, refToolbar.current)
  }, [refSvg.current])

  useEffect(() => {
    // Update data for markmap once value is changed
    const mm = refMm.current
    if (!mm) return
    const val = addLevelMarkers(value)
    const { root } = transformer.transform(val)
    // 设置最大展开层级，例如：只展开到第二层
    setFoldedByLevel(root, 3)
    // console.log(val, '---', root, r)
    mm.setData(root)
    mm.fit()
  }, [refMm.current, value])

  const handleChange = (e: any) => {
    setValue(e.target.value)
  }

  return (
    <React.Fragment>
      <svg className="w-100 h-[100%] bg-hbg dark:bg-bgDark dark:text-homehbg" ref={refSvg} />
      <div className="absolute bottom-1 right-1" ref={refToolbar}></div>
    </React.Fragment>
  )
}
