export type Animal = 'dog' | 'cat' | 'bird' | 'reptile' | 'rabbit'

export interface IPet {
  id: number
  name: string
  animal: Animal
  breed: string
  description: string
  images: string[]
  city: string
  state: string
}

export interface PetAPIResponse {
  numberOfResults: number
  startIndex: number
  endIndex: number
  hasNext: boolean
  pets: IPet[]
}

export interface BreedListAPIResponse {
  animal: Animal
  breeds: string[]
}
