import { getAreas, getCities, getProvinces } from '../../utils/select'

export { hasThreeLevels } from '../../utils/select'

/**
 * Ant Design Select 分开选择模式的适配器
 * 兼容 antd (React) 和 ant-design-vue (Vue)
 * 分别提供省、市、区三级的扁平选项，配合 onChange 联动使用
 *
 * 使用 hasThreeLevels(provinceCode) 判断是否需要显示第三个 Select：
 * - 普通省份：省 → 市 → 区（三级）
 * - 直辖市/港澳台：省 → 区（两级）
 */
export const provinceOptions = getProvinces()
export { getAreas, getCities }
