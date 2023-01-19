import { useQuery } from '@tanstack/react-query'
import fetchBreedList from './fetchBreedList'

// feed in animal and get back breed lists and loading status
export default function useBreedList(animal) {
  const results = useQuery(['breeds', animal], fetchBreedList)

  return [results?.data?.breeds ?? [], results.status]
}
