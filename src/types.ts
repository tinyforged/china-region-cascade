/** 级联选项，兼容 Ant Design / Naive UI 等框架的 Cascader 组件 */
export interface RegionOption {
  /** 行政区划代码（如 `'440000'`） */
  value: string
  /** 行政区划名称（如 `'广东省'`） */
  label: string
  /** 子级选项 */
  children?: RegionOption[]
}

/** province-city-china level.json 原始数据条目 */
export interface RegionDataItem {
  code: string
  name: string
  province: string
  city?: string | 0
  area?: string | 0
  town?: string | 0
  children?: RegionDataItem[]
}
