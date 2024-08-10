import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import PaginationLink from '@/components/PaginationLink.vue'

describe('PaginationLink.vue', () => {
  it('emits "changePage" event when a page is clicked', async () => {
    const wrapper = mount(PaginationLink, {
      props: {
        currentPage: 1,
        totalPages: 5
      }
    })

    await wrapper.findAll('li')[2].find('a').trigger('click') // Clicks on page 2
    expect(wrapper.emitted().changePage).toBeTruthy()
    expect(wrapper.emitted().changePage[0]).toEqual([2])
  })
})
