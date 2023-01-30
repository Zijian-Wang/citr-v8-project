import { expect, test } from 'vitest'
import { render } from '@testing-library/react'
import Carousel from '../Carousel'

test('clicking on thumbnails sync display them as hero', async () => {
  const images = ['1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg']
  const carousel = render(<Carousel images={images} />)

  const hero = await carousel.findByTestId('hero')
  expect(hero.src).toContain(images[0])

  for (let i = 0; i < images.length; i++) {
    const image = images[i]

    const thumb = await carousel.getByTestId(`thumbnail${i}`)
    await thumb.click()

    expect(hero.src).toContain(image)
    expect(Array.from(thumb.classList)).toContain('active')
  }

  carousel.unmount()
})
