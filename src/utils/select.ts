import type { RegionOption } from '../types'

import { regionOptions } from '../data'

/** 扁平选项（不含 children，适用于 Select 组件） */
export interface FlatOption {
  value: string
  label: string
}

/**
 * 判断指定省份是否为三级结构（省→市→区）
 * 直辖市（北京/上海/天津/重庆）和港澳台为两级结构（省→区），其余为三级
 * @param provinceCode 省级代码（如 `'440000'`）
 */
export function hasThreeLevels(provinceCode: string): boolean {
  const province = regionOptions.find(o => o.value === provinceCode)
  if (!province?.children?.length)
    return false
  return province.children.some(child => child.children?.length)
}

/**
 * 获取所有省级选项（扁平）
 * @returns 省级选项列表，如 `[{ value: '440000', label: '广东省' }, ...]`
 */
export function getProvinces(): FlatOption[] {
  return regionOptions.map(({ value, label }) => ({ value, label }))
}

/**
 * 根据省级代码获取市级选项（扁平）
 * 注意：直辖市调用此方法也会返回区级列表，因为数据结构上市辖区就是直接子级
 * @param provinceCode 省级代码（如 `'440000'`）
 * @returns 下一级选项列表，未找到时返回空数组
 */
export function getCities(provinceCode: string): FlatOption[] {
  const province = regionOptions.find(o => o.value === provinceCode)
  return (province?.children ?? []).map(({ value, label }) => ({ value, label }))
}

/**
 * 根据市级代码获取区县选项（扁平）
 * @param cityCode 市级代码（如 `'440100'`）
 * @returns 区县选项列表，未找到时返回空数组
 */
export function getAreas(cityCode: string): FlatOption[] {
  for (const province of regionOptions) {
    const city = province.children?.find(o => o.value === cityCode)
    if (city?.children)
      return city.children.map(({ value, label }) => ({ value, label }))
  }
  return []
}

/**
 * 根据 code 层级获取任意深度的扁平子级选项
 * @param parentCode 父级代码（如 `'440000'`、`'440100'`）
 * @returns 子级扁平选项列表，未找到时返回空数组
 */
export function getFlatChildren(parentCode: string): FlatOption[] {
  const find = (items: RegionOption[]): RegionOption | undefined => {
    for (const item of items) {
      if (item.value === parentCode)
        return item
      if (item.children) {
        const found = find(item.children)
        if (found)
          return found
      }
    }
  }
  const parent = find(regionOptions)
  return (parent?.children ?? []).map(({ value, label }) => ({ value, label }))
}
