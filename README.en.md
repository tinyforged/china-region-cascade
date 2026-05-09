# @tinyforged/china-region-cascade

[![npm version](https://img.shields.io/npm/v/@tinyforged/china-region-cascade)](https://www.npmjs.com/package/@tinyforged/china-region-cascade) [![npm downloads](https://img.shields.io/npm/dm/@tinyforged/china-region-cascade)](https://www.npmjs.com/package/@tinyforged/china-region-cascade)

[English](./README.en.md) | [中文](./README.md)

---

China administrative region cascade data with adapters for **Ant Design** (React & Vue), **Element Plus**, **Naive UI**, and more. Provides tree-structured data (`{ value, label, children }`), flat select data, and utility functions, built on top of [province-city-china](https://github.com/uiwjs/province-city-china).

## Features

- **Cascader** — Nested tree data for cascader components
- **TreeSelect** — Tree data with proper field mapping for tree-select components
- **Separate Selects** — Flat province/city/area lists for independent dropdown selection
- **Municipality-aware** — Automatically detects 2-level regions (Beijing, Shanghai, etc.) vs 3-level regions
- **Utility Functions** — Find, convert, and navigate region data
- **Tree-shakable** — Sub-path exports for minimal bundle size
- **TypeScript** — Full type definitions included

## Install

```bash
pnpm add @tinyforged/china-region-cascade
# or
npm install @tinyforged/china-region-cascade
```

## Quick Start

```ts
import { regionOptions } from '@tinyforged/china-region-cascade'

// regionOptions: RegionOption[]
// [
//   { value: '110000', label: '北京市', children: [{ value: '110101', label: '东城区' }, ...] },
//   { value: '440000', label: '广东省', children: [{ value: '440100', label: '广州市', children: [...] }, ...] },
//   ...
// ]
```

## Adapters

### Ant Design — Cascader

Compatible with both `antd` (React) and `ant-design-vue` (Vue).

```vue
<script setup>
import { cascaderOptions } from '@tinyforged/china-region-cascade/antd'
</script>

<template>
  <a-cascader :options="cascaderOptions" placeholder="Select region" />
</template>
```

```tsx
import { cascaderOptions } from '@tinyforged/china-region-cascade/antd'
// React
import { Cascader } from 'antd'

<Cascader options={cascaderOptions} placeholder="Select region" />
```

### Ant Design — TreeSelect

```vue
<script setup>
import { treeSelectOptions } from '@tinyforged/china-region-cascade/antd'
</script>

<template>
  <!-- treeSelectOptions maps label → title for Ant Design TreeSelect -->
  <a-tree-select :tree-data="treeSelectOptions" placeholder="Select region" />
</template>
```

### Ant Design — Separate Selects

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
  <a-select v-model:value="province" :options="provinceOptions" placeholder="Province" />
  <a-select
    v-if="isThreeLevel"
    v-model:value="city"
    :options="cityOptions"
    :disabled="!province"
    placeholder="City"
  />
  <a-select
    v-model:value="area"
    :options="isThreeLevel ? areaOptions : cityOptions"
    :disabled="isThreeLevel ? !city : !province"
    placeholder="District"
  />
</template>
```

### Element Plus — Cascader

```vue
<script setup>
import { cascaderOptions } from '@tinyforged/china-region-cascade/element-plus'
</script>

<template>
  <el-cascader :options="cascaderOptions" placeholder="Select region" />
</template>
```

### Element Plus — TreeSelect

```vue
<script setup>
import { treeSelectOptions } from '@tinyforged/china-region-cascade/element-plus'
</script>

<template>
  <el-tree-select
    :data="treeSelectOptions"
    placeholder="Select region"
    check-strictly
    :render-after-expand="false"
  />
</template>
```

### Element Plus — Separate Selects

```vue
<script setup>
import { computed, ref, watch } from 'vue'
import {
  provinceOptions,
  getCitiesForSelect,
  getAreasForSelect,
  hasThreeLevels,
} from '@tinyforged/china-region-cascade/element-plus'

const province = ref()
const city = ref()
const area = ref()

const isThreeLevel = computed(() =>
  province.value ? hasThreeLevels(province.value) : true,
)
const cityOptions = computed(() =>
  province.value ? getCitiesForSelect(province.value) : [],
)
const areaOptions = computed(() =>
  city.value ? getAreasForSelect(city.value) : [],
)

watch(province, () => { city.value = undefined; area.value = undefined })
watch(city, () => { area.value = undefined })
</script>

<template>
  <el-select v-model="province" placeholder="Province">
    <el-option v-for="item in provinceOptions" :key="item.value" :label="item.label" :value="item.value" />
  </el-select>
  <el-select v-if="isThreeLevel" v-model="city" :disabled="!province" placeholder="City">
    <el-option v-for="item in cityOptions" :key="item.value" :label="item.label" :value="item.value" />
  </el-select>
  <el-select
    v-model="area"
    :disabled="isThreeLevel ? !city : !province"
    :placeholder="isThreeLevel ? 'District' : 'Area'"
  >
    <el-option v-for="item in (isThreeLevel ? areaOptions : cityOptions)" :key="item.value" :label="item.label" :value="item.value" />
  </el-select>
</template>
```

### Naive UI — Cascader

```vue
<script setup>
import { cascaderOptions } from '@tinyforged/china-region-cascade/naive-ui'
</script>

<template>
  <n-cascader :options="cascaderOptions" placeholder="Select region" />
</template>
```

### Naive UI — TreeSelect

```vue
<script setup>
import { treeSelectOptions } from '@tinyforged/china-region-cascade/naive-ui'
</script>

<template>
  <!-- show-path displays full path like "Guangdong / Guangzhou / Liwan" -->
  <n-tree-select
    :options="treeSelectOptions"
    placeholder="Select region"
    show-path
  />
</template>
```

### Naive UI — Separate Selects

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
  <n-select v-model:value="province" :options="provinceOptions" placeholder="Province" />
  <n-select
    v-if="isThreeLevel"
    v-model:value="city"
    :options="cityOptions"
    :disabled="!province"
    placeholder="City"
  />
  <n-select
    v-model:value="area"
    :options="isThreeLevel ? areaOptions : cityOptions"
    :disabled="isThreeLevel ? !city : !province"
    placeholder="District"
  />
</template>
```

## Utility Functions

Import from `@tinyforged/china-region-cascade/utils`:

```ts
import {
  codesFromLabels,
  findByCode,
  findByLabel,
  findRegionByCode,
  findRegionByLabel,
  getAreas,
  getChildren,
  getCities,
  getCodesByLabels,
  getFlatChildren,
  getLabelsByCodes,
  getProvinces,
  getRegionChildren,
  hasThreeLevels,
  labelsFromCodes,
} from '@tinyforged/china-region-cascade/utils'
```

### Quick Helpers (no `regionOptions` needed)

```ts
// Convert code array to label string (for display)
labelsFromCodes(['440000', '440100', '440103'])
// → '广东省 / 广州市 / 荔湾区'

// Convert label array to code array
codesFromLabels(['广东省', '广州市', '荔湾区'])
// → ['440000', '440100', '440103']

// Find a node by code directly
findRegionByCode('440000')
// → { value: '440000', label: '广东省', children: [...] }

// Find a node by label directly
findRegionByLabel('广东省')
// → { value: '440000', label: '广东省', children: [...] }

// Get children by code directly
getRegionChildren('440000')
// → [{ value: '440100', label: '广州市', children: [...] }, ...]
```

### Find

```ts
// Find a node by region code
findByCode(regionOptions, '440000')
// → { value: '440000', label: '广东省', children: [...] }

// Find a node by region name
findByLabel(regionOptions, '广东省')
// → { value: '440000', label: '广东省', children: [...] }
```

### Convert

```ts
// Convert code path to label path
getLabelsByCodes(regionOptions, ['440000', '440100', '440103'])
// → ['广东省', '广州市', '荔湾区']

// Convert label path to code path
getCodesByLabels(regionOptions, ['广东省', '广州市', '荔湾区'])
// → ['440000', '440100', '440103']
```

### Children

```ts
// Get nested children of a node
getChildren(regionOptions, '440000')
// → [{ value: '440100', label: '广州市', children: [...] }, ...]

// Get flat children of any node by code
getFlatChildren('440000')
// → [{ value: '440100', label: '广州市' }, { value: '440200', label: '韶关市' }, ...]
```

### Flat Select Helpers

```ts
// Get all provinces (flat)
getProvinces()
// → [{ value: '110000', label: '北京市' }, { value: '440000', label: '广东省' }, ...]

// Get cities under a province (flat)
getCities('440000')
// → [{ value: '440100', label: '广州市' }, { value: '440200', label: '韶关市' }, ...]

// Get areas under a city (flat)
getAreas('440100')
// → [{ value: '440103', label: '荔湾区' }, { value: '440104', label: '越秀区' }, ...]

// Check if a province has 3 levels (province → city → area)
hasThreeLevels('440000') // true  (Guangdong)
hasThreeLevels('110000') // false (Beijing — municipality, only 2 levels)
```

## Types

```ts
/** Cascader option, compatible with Ant Design / Element Plus / Naive UI */
interface RegionOption {
  value: string
  label: string
  children?: RegionOption[]
}

/** Flat option for Select components */
interface FlatOption {
  value: string
  label: string
}
```

## Exports

| Sub-path        | Exports                                                                   |
| --------------- | ------------------------------------------------------------------------- |
| `.`             | `regionOptions`, types, all utility functions                             |
| `/antd`         | `cascaderOptions`, `treeSelectOptions`, `provinceOptions`, select helpers |
| `/element-plus` | `cascaderOptions`, `treeSelectOptions`, `provinceOptions`, select helpers |
| `/naive-ui`     | `cascaderOptions`, `treeSelectOptions`, `provinceOptions`, select helpers |
| `/utils`        | All utility functions                                                     |

## Adding a New UI Library

The adapter architecture is designed for easy extension:

```text
src/adapters/
├── antd/
│   ├── cascader.ts      # Cascader data
│   ├── tree-select.ts   # TreeSelect data
│   ├── select.ts        # Separate Select data
│   └── index.ts         # Re-export all
├── element-plus/
│   ├── cascader.ts
│   ├── tree-select.ts
│   ├── select.ts
│   └── index.ts
├── naive-ui/
│   ├── cascader.ts
│   ├── tree-select.ts
│   ├── select.ts
│   └── index.ts
└── your-lib/            # Add a new directory
    ├── cascader.ts
    └── index.ts
```

1. Create a new directory under `src/adapters/`
2. Add component files with proper type mapping
3. Create `index.ts` to re-export all components
4. Add entry to `tsup.config.ts` and `package.json` exports

## License

MIT © TinyForged
