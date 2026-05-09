import type { RegionOption } from '../../types'

import { regionOptions } from '../../data'

/** Element Plus ElTreeSelect 组件选项类型 */
export interface ElementPlusTreeSelectOption {
  value: string
  label: string
  children?: ElementPlusTreeSelectOption[]
}

function toTreeSelect(items: RegionOption[]): ElementPlusTreeSelectOption[] {
  return items.map(item => ({
    value: item.value,
    label: item.label,
    ...(item.children?.length ? { children: toTreeSelect(item.children) } : {}),
  }))
}

/** Element Plus ElTreeSelect 组件可直接使用的省市区树形数据 */
export const treeSelectOptions: ElementPlusTreeSelectOption[] = toTreeSelect(regionOptions)
