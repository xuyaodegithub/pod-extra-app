import type { MDXComponents } from 'mdx/types'
import Image, { ImageProps } from 'next/image'

// 这个文件允许你提供自定义 React 组件
// 以在 MDX 文件中使用。你可以导入和使用任何
// 你想要的 React 组件，包括内联样式、
// 其他库的组件等等。

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // 允许自定义内置组件，例如添加样式。
    // h1: ({ children }) => <h1 style={{ color: 'red', fontSize: '48px' }}>{children}</h1>,
    // img: (props) => <Image sizes="100vw" style={{ width: '100%', height: 'auto' }} {...(props as ImageProps)} />,
    ...components,
  }
}
