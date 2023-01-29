import { Component } from 'react'

class Carousel extends Component {
  static defaultProps = {
    images: ['http://pets-images.dev-apis.com/pets/none.jpg'],
  }
  state = {
    active: 0,
  }

  handelIndexClick = (event) => {
    this.setState({
      active: +event.target.dataset.index, // + is a shorthand for parseInt, active must be a number, yet event.target.dataset.index gives a string
    })
  }

  render() {
    // Cannot use hooks in class components, so we use this.state
    const { active } = this.state
    const { images } = this.props

    return (
      <div className='grid grid-cols-12 flex-row'>
        <img
          src={images[active]}
          alt='animal hero'
          className='col-span-4 float-left w-64 max-w-xs rounded-full border-4 border-gray-500'
        />
        <div className='col-start-5 col-end-12 ml-10 flex w-full flex-wrap gap-x-1 gap-y-1'>
          {images.map((photo, index) => (
            // eslint-disable-next-line
            <img
              onClick={this.handelIndexClick}
              key={photo}
              src={photo}
              className={
                index === active
                  ? 'h-32 w-32 gap-y-0 rounded-full border-2 border-gray-500'
                  : 'h-32 w-32 gap-y-0 rounded-full border-2 border-gray-500 opacity-50'
              }
              alt='animal thumbnail'
            />
          ))}
        </div>
      </div>
    )
  }
}

export default Carousel
