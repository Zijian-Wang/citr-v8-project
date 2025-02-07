import { Component, MouseEvent } from 'react'

interface IProps {
  images: string[]
}

class Carousel extends Component<IProps> {
  state = {
    active: 0,
  }

  static defaultProps = {
    images: ['http://pets-images.dev-apis.com/pets/none.jpg'],
  }

  handleIndexClick = (event: MouseEvent<HTMLElement>) => {
    if (!(event.target instanceof HTMLElement)) {
      return
    }
    event.target.dataset.index
      ? this.setState({ active: +event.target.dataset.index })
      : null
  }

  render() {
    const { active } = this.state
    const { images } = this.props
    return (
      <div className="carousel">
        <img data-testid="hero" src={images[active]} alt="animal" />
        <div className="carousel-smaller">
          {images.map((photo, index) => (
            // eslint-disable-next-line
            <img
              key={photo}
              src={photo}
              data-testid={`thumbnail${index}`}
              className={index === active ? 'active' : ''}
              alt="animal thumbnail"
              onClick={this.handleIndexClick}
              data-index={index}
            />
          ))}
        </div>
      </div>
    )
  }
}

export default Carousel
