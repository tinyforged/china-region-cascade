import type { RegionOption } from '../../types'

import { regionOptions } from '../../data'

/** Element Plus ElCascader 组件选项类型 */
export interface ElementPlusCascaderOption extends Record<string, unknown> {
  value: string
  label: string
  children?: ElementPlusCascaderOption[]
}

/** Element Plus ElCascader 组件可直接使用的省市区级联数据 */
export const cascaderOptions = regionOptions as ElementPlusCascaderOption[]
