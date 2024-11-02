'use client'
import React, { useState, useRef, useEffect } from 'react'
import { Markmap } from 'markmap-view'
import { transformer, loadAssets } from '@/app/lib/markMap'
import { Toolbar } from 'markmap-toolbar'
import 'markmap-toolbar/dist/style.css'

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

export default function MarkmapHooks({ mindmapInMd, fullScreen }: { mindmapInMd: any; fullScreen?: boolean }) {
  const [value, setValue] = useState(mindmapInMd)
  // Ref for SVG element
  const refSvg = useRef<any>(null)
  // Ref for markmap object
  const refMm = useRef<Markmap>()
  // Ref for toolbar wrapper
  const refToolbar = useRef<any>(null)

  function setFoldedByLevel(node: any, maxExpandedLevel = 2, currentLevel = 1) {
    // node.state = { ...node.state, expanded: currentLevel <= maxExpandedLevel } // 超过最大展开层级的节点将被折叠
    //0  开启  1 折叠
    node.payload = { fold: currentLevel <= maxExpandedLevel ? 0 : 1 }
    if (node.children) {
      node.children.forEach((child: any) => setFoldedByLevel(child, maxExpandedLevel, currentLevel + 1))
    }
  }
  // 初始化 Markmap，并设置默认折叠
  useEffect(() => {
    if (!window) return
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
    loadAssets()
    const { root } = transformer.transform(value || '')
    // 设置最大展开层级，例如：只展开到第二层
    setFoldedByLevel(root, 2)
    mm.setData(root)
    mm.fit()
    if (fullScreen) {
      mm.fit()
    }
  }, [refMm.current, value, fullScreen])

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