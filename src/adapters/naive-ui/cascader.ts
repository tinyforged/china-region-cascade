import { regionOptions } from '../../data'

/**
 * Naive UI NCascader 组件选项类型
 * 兼容 Naive UI 的 CascaderOption（含索引签名）
 */
export interface NaiveUiCascaderOption {
  value: string
  label: string
  children?: NaiveUiCascaderOption[]
  [key: string]: unknown
}

/** Naive UI NCascader 组件可直接使用的省市区级联数据 */
export const cascaderOptions = regionOptions as NaiveUiCascaderOption[]
