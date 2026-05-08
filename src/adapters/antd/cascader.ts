import type { RegionOption } from '../../types'

import { regionOptions } from '../../data'

/** Ant Design Cascader 组件选项类型 */
export interface AntdCascaderOption extends RegionOption {}

/** Ant Design Cascader 组件可直接使用的省市区级联数据 */
export const cascaderOptions: AntdCascaderOption[] = regionOptions
