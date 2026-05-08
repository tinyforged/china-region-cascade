import type { RegionOption } from '../types'

/**
 * 根据行政区划代码路径获取对应的名称路径
 * @param options 级联选项数据
 * @param codes 行政区划代码数组（如 `['440000', '440100', '440103']`）
 * @returns 对应的名称数组（如 `['广东省', '广州市', '荔湾区']`），无法匹配时提前终止
 */
export function getLabelsByCodes(options: RegionOption[], codes: string[]): string[] {
  const labels: string[] = []
  let current = options
  for (const code of codes) {
    const item = current.find(o => o.value === code)
    if (!item)
      break
    labels.push(item.label)
    current = item.children ?? []
  }
  return labels
}

/**
 * 根据行政区划名称路径获取对应的代码路径
 * @param options 级联选项数据
 * @param labels 行政区划名称数组（如 `['广东省', '广州市', '荔湾区']`）
 * @returns 对应的代码数组（如 `['440000', '440100', '440103']`），无法匹配时提前终止
 */
export function getCodesByLabels(options: RegionOption[], labels: string[]): string[] {
  const codes: string[] = []
  let current = options
  for (const label of labels) {
    const item = current.find(o => o.label === label)
    if (!item)
      break
    codes.push(item.value)
    current = item.children ?? []
  }
  return codes
}
