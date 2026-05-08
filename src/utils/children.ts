import type { RegionOption } from '../types'

import { findByCode } from './find'

/**
 * 获取指定行政区划代码的子级选项
 * @param options 级联选项数据
 * @param code 行政区划代码（如 `'440000'`）
 * @returns 子级选项数组，无子级或未找到时返回空数组
 */
export function getChildren(options: RegionOption[], code: string): RegionOption[] {
  const item = findByCode(options, code)
  return item?.children ?? []
}
