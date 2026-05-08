import { getAreas, getCities, getProvinces } from '../../utils/select'

/** Naive UI NSelect 组件选项类型 */
export interface NaiveUiSelectOption {
  value: string
  label: string
  [key: string]: unknown
}

export { hasThreeLevels } from '../../utils/select'

/**
 * Naive UI NSelect 分开选择模式的适配器
 * 分别提供省、市、区三级的扁平选项，配合 onUpdate:value 联动使用
 *
 * 使用 hasThreeLevels(provinceCode) 判断是否需要显示第三个 Select：
 * - 普通省份：省 → 市 → 区（三级）
 * - 直辖市/港澳台：省 → 区（两级）
 */
export const provinceOptions = getProvinces() as NaiveUiSelectOption[]
export function getCitiesForSelect(provinceCode: string): NaiveUiSelectOption[] {
  return getCities(provinceCode) as NaiveUiSelectOption[]
}
export function getAreasForSelect(cityCode: string): NaiveUiSelectOption[] {
  return getAreas(cityCode) as NaiveUiSelectOption[]
}
