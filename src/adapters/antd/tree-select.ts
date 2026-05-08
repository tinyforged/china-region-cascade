import type { RegionOption } from '../../types'

import { regionOptions } from '../../data'

/**
 * Ant Design TreeSelect 组件选项类型
 * 字段映射：value → value, label → title, children → children
 */
export interface AntdTreeSelectOption {
  value: string
  title: string
  children?: AntdTreeSelectOption[]
}

function toTreeSelect(items: RegionOption[]): AntdTreeSelectOption[] {
  return items.map(item => ({
    value: item.value,
    title: item.label,
    ...(item.children?.length ? { children: toTreeSelect(item.children) } : {}),
  }))
}

/** Ant Design TreeSelect 组件可直接使用的省市区数据 */
export const treeSelectOptions: AntdTreeSelectOption[] = toTreeSelect(regionOptions)
