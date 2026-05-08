# @tinyforged/china-region-cascade

[English](./README.md) | [中文](./README.zh-CN.md)

---

中国行政区划级联数据，提供 **Ant Design**（React & Vue）、**Naive UI** 等主流 UI 框架的适配器。基于 [province-city-china](https://github.com/uiwjs/province-city-china) 构建，提供树形数据、扁平列表和工具函数。

## 特性

- **级联选择器 (Cascader)** — 嵌套树形数据，直接用于 Cascader 组件
- **树选择器 (TreeSelect)** — 自动映射字段，适配 TreeSelect 组件
- **分开下拉框 (Select)** — 扁平的省/市/区列表，用于独立联动选择
- **直辖市感知** — 自动识别两级区域（北京、上海等）和三级区域
- **工具函数** — 查找、转换、导航行政区划数据
- **按需加载** — 子路径导出，支持 tree-shaking
- **TypeScript** — 完整类型定义

## 安装

```bash
pnpm add @tinyforged/china-region-cascade
```

## 快速开始

```ts
import { regionOptions } from '@tinyforged/china-region-cascade'

// regionOptions: RegionOption[]
// [
//   { value: '110000', label: '北京市', children: [{ value: '110101', label: '东城区' }, ...] },
//   { value: '440000', label: '广东省', children: [{ value: '440100', label: '广州市', children: [...] }, ...] },
//   ...
// ]
```

## 适配器

### Ant Design — 级联选择器

兼容 `antd`（React）和 `ant-design-vue`（Vue）。

```vue
<script setup>
import { cascaderOptions } from '@tinyforged/china-region-cascade/antd'
</script>

<template>
  <a-cascader :options="cascaderOptions" placeholder="请选择地区" />
</template>
```

```tsx
import { cascaderOptions } from '@tinyforged/china-region-cascade/antd'
// React
import { Cascader } from 'antd'

<Cascader options={cascaderOptions} placeholder="请选择地区" />
```

### Ant Design — 树选择器

```vue
<script setup>
import { treeSelectOptions } from '@tinyforged/china-region-cascade/antd'
</script>

<template>
  <!-- treeSelectOptions 已将 label 映射为 title，适配 Ant Design TreeSelect -->
  <a-tree-select :tree-data="treeSelectOptions" placeholder="请选择地区" />
</template>
```

### Ant Design — 分开下拉框

```vue
<script setup>
import { computed, ref, watch } from 'vue'
import {
  provinceOptions,
  getCities,
  getAreas,
  hasThreeLevels,
} from '@tinyforged/china-region-cascade/antd'

const province = ref(undefined)
const city = ref(undefined)
const area = ref(undefined)

const isThreeLevel = computed(() =>
  province.value ? hasThreeLevels(province.value) : true,
)
const cityOptions = computed(() =>
  province.value ? getCities(province.value) : [],
)
const areaOptions = computed(() =>
  city.value ? getAreas(city.value) : [],
)

watch(province, () => { city.value = undefined; area.value = undefined })
watch(city, () => { area.value = undefined })
</script>

<template>
  <a-select v-model:value="province" :options="provinceOptions" placeholder="省/直辖市" />
  <a-select
    v-if="isThreeLevel"
    v-model:value="city"
    :options="cityOptions"
    :disabled="!province"
    placeholder="市"
  />
  <a-select
    v-model:value="area"
    :options="isThreeLevel ? areaOptions : cityOptions"
    :disabled="isThreeLevel ? !city : !province"
    :placeholder="isThreeLevel ? '区/县' : '区'"
  />
</template>
```

> **提示：** 直辖市（北京、上海、天津、重庆）和港澳台只有两级结构（省 → 区），`hasThreeLevels()` 返回 `false`，此时隐藏中间的「市」下拉框，直接显示「省 → 区」。

### Naive UI — 级联选择器

```vue
<script setup>
import { cascaderOptions } from '@tinyforged/china-region-cascade/naive-ui'
</script>

<template>
  <n-cascader :options="cascaderOptions" placeholder="请选择地区" />
</template>
```

### Naive UI — 树选择器

```vue
<script setup>
import { treeSelectOptions } from '@tinyforged/china-region-cascade/naive-ui'
</script>

<template>
  <!-- show-path 可显示完整路径，如 "广东省 / 广州市 / 荔湾区" -->
  <n-tree-select
    :options="treeSelectOptions"
    placeholder="请选择地区"
    show-path
  />
</template>
```

### Naive UI — 分开下拉框

```vue
<script setup>
import { computed, ref, watch } from 'vue'
import {
  provinceOptions,
  getCitiesForSelect,
  getAreasForSelect,
  hasThreeLevels,
} from '@tinyforged/china-region-cascade/naive-ui'

const province = ref(null)
const city = ref(null)
const area = ref(null)

const isThreeLevel = computed(() =>
  province.value ? hasThreeLevels(province.value) : true,
)
const cityOptions = computed(() =>
  province.value ? getCitiesForSelect(province.value) : [],
)
const areaOptions = computed(() =>
  city.value ? getAreasForSelect(city.value) : [],
)

watch(province, () => { city.value = null; area.value = null })
watch(city, () => { area.value = null })
</script>

<template>
  <n-select v-model:value="province" :options="provinceOptions" placeholder="省/直辖市" />
  <n-select
    v-if="isThreeLevel"
    v-model:value="city"
    :options="cityOptions"
    :disabled="!province"
    placeholder="市"
  />
  <n-select
    v-model:value="area"
    :options="isThreeLevel ? areaOptions : cityOptions"
    :disabled="isThreeLevel ? !city : !province"
    :placeholder="isThreeLevel ? '区/县' : '区'"
  />
</template>
```

## 工具函数

从 `@tinyforged/china-region-cascade/utils` 导入：

```ts
import {
  findByCode,
  findByLabel,
  getAreas,
  getChildren,
  getCities,
  getCodesByLabels,
  getFlatChildren,
  getLabelsByCodes,
  getProvinces,
  hasThreeLevels,
} from '@tinyforged/china-region-cascade/utils'
```

### 查找

```ts
// 根据行政区划代码递归查找节点
findByCode(regionOptions, '440000')
// → { value: '440000', label: '广东省', children: [...] }

// 根据行政区划名称递归查找节点
findByLabel(regionOptions, '广东省')
// → { value: '440000', label: '广东省', children: [...] }
```

### 转换

```ts
// 根据代码路径获取名称路径
getLabelsByCodes(regionOptions, ['440000', '440100', '440103'])
// → ['广东省', '广州市', '荔湾区']

// 根据名称路径获取代码路径
getCodesByLabels(regionOptions, ['广东省', '广州市', '荔湾区'])
// → ['440000', '440100', '440103']
```

### 子级

```ts
// 获取指定节点的嵌套子级
getChildren(regionOptions, '440000')
// → [{ value: '440100', label: '广州市', children: [...] }, ...]

// 获取任意节点的扁平子级
getFlatChildren('440000')
// → [{ value: '440100', label: '广州市' }, { value: '440200', label: '韶关市' }, ...]
```

### 扁平选择辅助

```ts
// 获取所有省级选项（扁平）
getProvinces()
// → [{ value: '110000', label: '北京市' }, { value: '440000', label: '广东省' }, ...]

// 获取指定省的市级选项（扁平）
getCities('440000')
// → [{ value: '440100', label: '广州市' }, { value: '440200', label: '韶关市' }, ...]

// 获取指定市的区县选项（扁平）
getAreas('440100')
// → [{ value: '440103', label: '荔湾区' }, { value: '440104', label: '越秀区' }, ...]

// 判断省份是否为三级结构（省 → 市 → 区）
hasThreeLevels('440000') // true  （广东省：省 → 市 → 区）
hasThreeLevels('110000') // false （北京市：直辖市 → 区，仅两级）
```

## 类型

```ts
/** 级联选项，兼容 Ant Design / Naive UI */
interface RegionOption {
  value: string
  label: string
  children?: RegionOption[]
}

/** 扁平选项，用于 Select 组件 */
interface FlatOption {
  value: string
  label: string
}
```

## 导出

| 子路径      | 导出内容                                                                   |
| ----------- | -------------------------------------------------------------------------- |
| `.`         | `regionOptions`、类型、所有工具函数                                        |
| `/antd`     | `cascaderOptions`、`treeSelectOptions`、`provinceOptions`、Select 辅助函数 |
| `/naive-ui` | `cascaderOptions`、`treeSelectOptions`、`provinceOptions`、Select 辅助函数 |
| `/utils`    | 所有工具函数                                                               |

## 添加新的 UI 库

适配器架构设计为易于扩展：

```text
src/adapters/
├── antd/
│   ├── cascader.ts      # 级联选择器数据
│   ├── tree-select.ts   # 树选择器数据
│   ├── select.ts        # 分开下拉框数据
│   └── index.ts         # 统一导出
├── naive-ui/
│   ├── cascader.ts
│   ├── tree-select.ts
│   ├── select.ts
│   └── index.ts
└── your-lib/            # 添加新目录即可
    ├── cascader.ts
    └── index.ts
```

1. 在 `src/adapters/` 下创建新目录
2. 添加组件文件，做好字段映射
3. 创建 `index.ts` 统一导出
4. 在 `tsup.config.ts` 和 `package.json` exports 中添加入口

## 许可证

MIT © TinyForged
