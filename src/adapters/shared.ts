import type { RegionOption } from '../types'

/**
 * Transform raw region data into cascader-compatible options.
 * Reusable across all UI library adapters.
 */
export function toCascaderOptions(data: RegionOption[]): RegionOption[] {
  return data
}
