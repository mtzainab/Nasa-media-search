import { describe, it, expect, beforeEach } from 'vitest'

import { mount } from '@vue/test-utils'
import SearchBar from '@/components/SearchBar.vue'

describe('SearchBar.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(SearchBar)
  })

  it('displays an error if search query is empty when search is triggered', async () => {
    wrapper.setData({ query: '' })
    await wrapper.find('button').trigger('click')
    expect(wrapper.vm.validationError).toBe('Search query cannot be empty.')
    expect(wrapper.find('.invalid-feedback').text()).toBe('Search query cannot be empty.')
  })

  it('displays an error if no media type is selected when search is triggered', async () => {
    wrapper.setData({ query: 'mars' })
    wrapper.setData({ media_types: [] })
    await wrapper.find('button').trigger('click')
    expect(wrapper.vm.mediaValidationError).toBe('Please check at least one media type')
    expect(wrapper.find('.invalid-feedback').text()).toBe('Please check at least one media type')
  })

  it('emits "search" event with the correct parameters when input is valid', async () => {
    wrapper.setData({ query: 'mars', media_types: ['image'] })
    await wrapper.find('button').trigger('click')

    expect(wrapper.vm.validationError).toBe('')
    expect(wrapper.vm.mediaValidationError).toBe('')
    expect(wrapper.emitted().search).toBeTruthy()
    expect(wrapper.emitted().search[0]).toEqual(['mars', 'image'])
  })

  it('displays no error when media type and query are both valid', async () => {
    wrapper.setData({ query: 'moon', media_types: ['image'] })
    await wrapper.find('button').trigger('click')

    expect(wrapper.vm.validationError).toBe('')
    expect(wrapper.vm.mediaValidationError).toBe('')
    expect(wrapper.find('.invalid-feedback').exists()).toBe(false)
  })

  it('validates and emits search event when Enter key is pressed', async () => {
    wrapper.setData({ query: 'jupiter', media_types: ['image'] })
    await wrapper.find('input').trigger('keyup.enter')

    expect(wrapper.emitted().search).toBeTruthy()
    expect(wrapper.emitted().search[0]).toEqual(['jupiter', 'image'])
  })
})
