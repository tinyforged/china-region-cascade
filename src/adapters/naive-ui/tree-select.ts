import type { RegionOption } from '../../types'

import { regionOptions } from '../../data'

/**
 * Naive UI NTreeSelect 组件选项类型
 * 默认使用 `key` 作为唯一标识，`label` 作为显示文本
 */
export interface NaiveUiTreeSelectOption {
  key: string
  label: string
  children?: NaiveUiTreeSelectOption[]
  [key: string]: unknown
}

function toTreeSelect(items: RegionOption[]): NaiveUiTreeSelectOption[] {
  return items.map(item => ({
    key: item.value,
    label: item.label,
    ...(item.children?.length ? { children: toTreeSelect(item.children) } : {}),
  }))
}

/** Naive UI NTreeSelect 组件可直接使用的省市区数据 */
export const treeSelectOptions: NaiveUiTreeSelectOption[] = toTreeSelect(regionOptions)
