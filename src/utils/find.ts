import type { RegionOption } from '../types'

import { regionOptions } from '../data'

/**
 * 根据行政区划代码递归查找节点
 * @param options 级联选项数据
 * @param code 行政区划代码（如 `'440000'`）
 * @returns 匹配的节点，未找到返回 `undefined`
 */
export function findByCode(options: RegionOption[], code: string): RegionOption | undefined {
  for (const item of options) {
    if (item.value === code)
      return item
    if (item.children) {
      const found = findByCode(item.children, code)
      if (found)
        return found
    }
  }
}

/**
 * 根据行政区划名称递归查找节点
 * @param options 级联选项数据
 * @param label 行政区划名称（如 `'广东省'`）
 * @returns 匹配的节点，未找到返回 `undefined`
 */
export function findByLabel(options: RegionOption[], label: string): RegionOption | undefined {
  for (const item of options) {
    if (item.label === label)
      return item
    if (item.children) {
      const found = findByLabel(item.children, label)
      if (found)
        return found
    }
  }
}

/** 根据 code 直接查找节点（无需手动传入 regionOptions） */
export function findRegionByCode(code: string): RegionOption | undefined {
  return findByCode(regionOptions, code)
}

/** 根据名称直接查找节点（无需手动传入 regionOptions） */
export function findRegionByLabel(label: string): RegionOption | undefined {
  return findByLabel(regionOptions, label)
}
