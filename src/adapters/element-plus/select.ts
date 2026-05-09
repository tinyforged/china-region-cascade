import { getAreas, getCities, getProvinces } from '../../utils/select'

export { hasThreeLevels } from '../../utils/select'

/** Element Plus ElSelect 组件选项类型 */
export interface ElementPlusSelectOption {
  value: string
  label: string
}

/**
 * Element Plus ElSelect 分开选择模式的适配器
 * 分别提供省、市、区三级的扁平选项，配合 @change 联动使用
 *
 * 使用 hasThreeLevels(provinceCode) 判断是否需要显示第三个 Select：
 * - 普通省份：省 → 市 → 区（三级）
 * - 直辖市/港澳台：省 → 区（两级）
 */
export const provinceOptions = getProvinces() as ElementPlusSelectOption[]

export function getCitiesForSelect(provinceCode: string): ElementPlusSelectOption[] {
  return getCities(provinceCode) as ElementPlusSelectOption[]
}

export function getAreasForSelect(cityCode: string): ElementPlusSelectOption[] {
  return getAreas(cityCode) as ElementPlusSelectOption[]
}
