'use client'
import { useMyContext } from '@/context/MyContext'
import { useState, useEffect } from 'react'

export default function Image({
  src,
  className,
  alt,
  title,
}: {
  src: string
  className?: string
  alt?: string
  title?: string
  props?: any
}) {
  const [url, setUrl] = useState(src)
  const [hasError, setHasError] = useState(false)
  const { isDark } = useMyContext()
  useEffect(() => {
    setUrl(src)
  }, [src])
  function errorHandler() {
    if (!hasError) {
      setUrl(`/images/${isDark ? 'no-picture-dark-mode' : 'no-picture-light-mode'}.jpg`)
      setHasError(true)
    }
  }
  return <img src={url} alt={alt} title={title} onError={errorHandler} className={`object-cover ${className}`} />
}
