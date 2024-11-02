import { loadJS, loadCSS, walkTree } from 'markmap-common'
import { Transformer } from 'markmap-lib'
import * as markmap from 'markmap-view'

export const transformer = new Transformer()
const { scripts, styles }: any = transformer.getAssets()
export const loadAssets: any = () => {
  return Promise.all([loadCSS(styles), loadJS(scripts, { getMarkmap: () => markmap })])
}
// loadCSS(styles)
// loadJS(scripts, { getMarkmap: () => markmap })
