import { createContext } from 'react'
import { IPet } from './APIResonsesTypes'

const AdoptedPetContext = createContext<
  [IPet | null, (adoptedPet: IPet) => void]
>([
  {
    id: 0,
    name: '',
    animal: 'dog',
    description: 'Lorem Ipsum',
    breed: '',
    images: [],
    city: '',
    state: '',
  },
  () => {},
])

export default AdoptedPetContext
