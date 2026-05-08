import antfu from '@antfu/eslint-config'

export default antfu({
  type: 'lib',
  ts: true,
  formatters: {
    markdown: 'prettier',
  },
})
