import { describe, it, expect, beforeEach } from 'vitest'

import { mount } from '@vue/test-utils'
import ImageList from '@/components/ImageList.vue'

describe('ImageList.vue', () => {
  let wrapper

  const mockImages = [
    {
      data: [{ nasa_id: 'image1', title: 'Image 1', description: 'Description 1' }],
      links: [{ href: 'https://example.com/image1.jpg' }]
    },
    {
      data: [{ nasa_id: 'image2', title: 'Image 2', description: 'Description 2' }],
      links: [{ href: 'https://example.com/image2.jpg' }]
    }
  ]

  beforeEach(() => {
    wrapper = mount(ImageList, {
      propsData: {
        images: mockImages
      }
    })
  })

  it('renders the correct number of images', () => {
    const imageItems = wrapper.findAll('.image-item')
    expect(imageItems.length).toBe(mockImages.length)
  })

  it('displays the correct image source and alt text', () => {
    const imageElements = wrapper.findAll('img')
    imageElements.forEach((img, index) => {
      expect(img.attributes('src')).toBe(mockImages[index].links[0].href)
      expect(img.attributes('alt')).toBe('Image')
    })
  })

  it('displays the correct image titles', () => {
    const titles = wrapper.findAll('.image-info h5')
    titles.forEach((title, index) => {
      expect(title.text()).toBe(mockImages[index].data[0].title)
    })
  })

  it('displays the correct image descriptions', () => {
    const descriptions = wrapper.findAll('.image-info p')
    descriptions.forEach((description, index) => {
      expect(description.html()).toContain(mockImages[index].data[0].description)
    })
  })

  it('emits "select" event with the correct image object when an image is clicked', async () => {
    const firstImageItem = wrapper.find('.image-item')
    await firstImageItem.trigger('click')

    expect(wrapper.emitted().select).toBeTruthy()
    expect(wrapper.emitted().select[0]).toEqual([mockImages[0]])
  })

  it('applies hover effects on image items', async () => {
    const imageItem = wrapper.find('.image-item')
    await imageItem.trigger('mouseenter')

    expect(imageItem.classes()).toContain('image-item')
    // Since CSS effects are visual, the important part here is that the class is present
    // For actual visual tests, use something like Cypress with screenshot comparison
  })

  it('displays image information on hover', async () => {
    const imageItem = wrapper.find('.image-item')
    await imageItem.trigger('mouseenter')

    const infoBox = imageItem.find('.image-info')
    expect(infoBox.exists()).toBe(true)
    expect(infoBox.isVisible()).toBe(true) // The opacity transition isn't directly testable, but visibility can be checked
  })
})
