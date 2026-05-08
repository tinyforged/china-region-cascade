<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { Cascader as ACascader, Select as ASelect, TreeSelect as ATreeSelect } from 'ant-design-vue'
import { NCascader, NSelect, NTreeSelect } from 'naive-ui'

import {
  cascaderOptions as antdCascaderOptions,
  getAreas as antdGetAreas,
  getCities as antdGetCities,
  hasThreeLevels as antdHasThreeLevels,
  provinceOptions as antdProvinces,
  treeSelectOptions as antdTreeOptions,
} from '@tinyforged/china-region-cascade/antd'
import { regionOptions } from '@tinyforged/china-region-cascade'
import { getLabelsByCodes } from '@tinyforged/china-region-cascade/utils'
import {
  cascaderOptions as naiveCascaderOptions,
  getAreasForSelect as naiveGetAreas,
  getCitiesForSelect as naiveGetCities,
  hasThreeLevels as naiveHasThreeLevels,
  provinceOptions as naiveProvinces,
  treeSelectOptions as naiveTreeOptions,
} from '@tinyforged/china-region-cascade/naive-ui'

// --- Ant Design Cascader ---
const antdCascaderValue = ref<string[]>([])

// --- Ant Design TreeSelect ---
const antdTreeValue = ref<string>()

function getAncestorCodes(code: string): string[] {
  const path: string[] = []
  const walk = (items: typeof regionOptions): boolean => {
    for (const item of items) {
      if (item.value === code) {
        path.push(item.value)
        return true
      }
      if (item.children && walk(item.children)) {
        path.unshift(item.value)
        return true
      }
    }
    return false
  }
  walk(regionOptions)
  return path
}

const antdTreePath = computed(() => {
  if (!antdTreeValue.value)
    return ''
  const codes = getAncestorCodes(antdTreeValue.value)
  return getLabelsByCodes(regionOptions, codes).join(' / ')
})

// --- Ant Design Separate Selects ---
const antdProvince = ref<string | undefined>(undefined)
const antdCity = ref<string | undefined>(undefined)
const antdArea = ref<string | undefined>(undefined)

const antdIsThreeLevel = computed(() => antdProvince.value ? antdHasThreeLevels(antdProvince.value) : true)
const antdCityOptions = computed(() => antdProvince.value ? antdGetCities(antdProvince.value) : [])
const antdAreaOptions = computed(() => antdCity.value ? antdGetAreas(antdCity.value) : [])

watch(antdProvince, () => {
  antdCity.value = undefined
  antdArea.value = undefined
})
watch(antdCity, () => {
  antdArea.value = undefined
})

// --- Naive UI Cascader ---
const naiveCascaderValue = ref<string | null>(null)

// --- Naive UI TreeSelect ---
const naiveTreeValue = ref<string | null>(null)

// --- Naive UI Separate Selects ---
const naiveProvince = ref<string | null>(null)
const naiveCity = ref<string | null>(null)
const naiveArea = ref<string | null>(null)

const naiveIsThreeLevel = computed(() => naiveProvince.value ? naiveHasThreeLevels(naiveProvince.value) : true)
const naiveCityOptions = computed(() => naiveProvince.value ? naiveGetCities(naiveProvince.value) : [])
const naiveAreaOptions = computed(() => naiveCity.value ? naiveGetAreas(naiveCity.value) : [])

watch(naiveProvince, () => {
  naiveCity.value = null
  naiveArea.value = null
})
watch(naiveCity, () => {
  naiveArea.value = null
})
</script>

<template>
  <div style="max-width: 700px; margin: 40px auto; padding: 0 20px; font-family: sans-serif;">
    <h2>China Region Cascade Playground</h2>

    <!-- Ant Design -->
    <h3>Ant Design — Cascader</h3>
    <a-cascader
      v-model:value="antdCascaderValue"
      :options="antdCascaderOptions"
      placeholder="请选择地区"
      style="width: 100%"
    />
    <p>Selected: {{ antdCascaderValue }}</p>

    <h3>Ant Design — TreeSelect</h3>
    <a-tree-select
      v-model:value="antdTreeValue"
      :tree-data="antdTreeOptions"
      placeholder="请选择地区"
      show-search
      tree-default-expand-all
      style="width: 100%"
    />
    <p>Selected: {{ antdTreePath || antdTreeValue }}</p>

    <h3>Ant Design — Separate Selects</h3>
    <div style="display: flex; gap: 8px;">
      <a-select
        v-model:value="antdProvince"
        :options="antdProvinces"
        placeholder="省/直辖市"
        style="flex: 1"
      />
      <a-select
        v-if="antdIsThreeLevel"
        v-model:value="antdCity"
        :options="antdCityOptions"
        placeholder="市"
        :disabled="!antdProvince"
        style="flex: 1"
      />
      <a-select
        v-model:value="antdArea"
        :options="antdIsThreeLevel ? antdAreaOptions : antdCityOptions"
        :placeholder="antdIsThreeLevel ? '区/县' : '区'"
        :disabled="antdIsThreeLevel ? !antdCity : !antdProvince"
        style="flex: 1"
      />
    </div>
    <p>Selected: {{ [antdProvince, antdCity, antdArea].filter(Boolean) }}</p>

    <hr style="margin: 30px 0; border-color: #eee;" />

    <!-- Naive UI -->
    <h3>Naive UI — Cascader</h3>
    <n-cascader
      v-model:value="naiveCascaderValue"
      :options="naiveCascaderOptions"
      placeholder="请选择地区"
      style="width: 100%"
    />
    <p>Selected: {{ naiveCascaderValue }}</p>

    <h3>Naive UI — TreeSelect</h3>
    <n-tree-select
      v-model:value="naiveTreeValue"
      :options="naiveTreeOptions"
      placeholder="请选择地区"
      default-expand-all
      show-path
      style="width: 100%"
    />
    <p>Selected: {{ naiveTreeValue }}</p>

    <h3>Naive UI — Separate Selects</h3>
    <div style="display: flex; gap: 8px;">
      <n-select
        v-model:value="naiveProvince"
        :options="naiveProvinces"
        placeholder="省/直辖市"
        style="flex: 1"
      />
      <n-select
        v-if="naiveIsThreeLevel"
        v-model:value="naiveCity"
        :options="naiveCityOptions"
        placeholder="市"
        :disabled="!naiveProvince"
        style="flex: 1"
      />
      <n-select
        v-model:value="naiveArea"
        :options="naiveIsThreeLevel ? naiveAreaOptions : naiveCityOptions"
        :placeholder="naiveIsThreeLevel ? '区/县' : '区'"
        :disabled="naiveIsThreeLevel ? !naiveCity : !naiveProvince"
        style="flex: 1"
      />
    </div>
    <p>Selected: {{ [naiveProvince, naiveCity, naiveArea].filter(Boolean) }}</p>
  </div>
</template>
