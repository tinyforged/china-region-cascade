import type { RegionDataItem, RegionOption } from './types'

import rawLevel from 'province-city-china/dist/level.json'

/**
 * 将 province-city-china 的原始层级数据转换为级联选项格式
 * @param items 原始层级数据
 * @returns `{ value, label, children }` 格式的级联选项
 */
function transform(items: RegionDataItem[]): RegionOption[] {
  return items.map((item) => {
    const option: RegionOption = {
      value: item.code,
      label: item.name,
    }
    if (item.children?.length)
      option.children = transform(item.children)
    return option
  })
}

/** 中国行政区划级联选项数据（省 → 市 → 区） */
export const regionOptions: RegionOption[] = transform(rawLevel as RegionDataItem[])
