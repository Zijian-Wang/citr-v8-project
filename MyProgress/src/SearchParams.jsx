import { useState, useContext } from 'react'
import { useQuery } from '@tanstack/react-query'
import Results from './Results'
import useBreedList from './useBreedList'
import fetchSearch from './fetchSearch'
import AdoptedPetContext from './AdoptedPetContext'

const ANIMALS = ['bird', 'cat', 'dog', 'rabbit', 'reptile']

const SearchParams = () => {
  const [animal, setAnimal] = useState('')
  const [breeds] = useBreedList(animal)
  const [requestParams, setRequestParams] = useState({
    location: '',
    animal: '',
    breed: '',
  })

  const result = useQuery(['search', requestParams], fetchSearch)
  const pets = result?.data?.pets || []

  const [adoptedPet] = useContext(AdoptedPetContext)

  return (
    <div className="my-0 mx-auto w-11/12">
      <form
        className="mb-10 flex flex-col items-center justify-center rounded-lg bg-gray-200 p-10 shadow-lg"
        onSubmit={(e) => {
          e.preventDefault()
          // get data from form, using Form() : a method from browser
          const formData = new FormData(e.target)
          // console.log(formData)
          const obj = {
            animal: formData.get('animal') ?? '',
            breed: formData.get('breed') ?? '',
            location: formData.get('location') ?? '',
          }
          // console.log(obj)
          setRequestParams(obj)
        }}
      >
        {adoptedPet ? (
          <div className="pet image-container">
            <img src={adoptedPet.images[0]} alt={adoptedPet.name} />
          </div>
        ) : null}

        <label htmlFor="location">
          Location
          <input
            type={'text'}
            name="location"
            id="location"
            placeholder="Location"
            className={'search-input'}
          />
        </label>

        <label htmlFor="animal">
          Animal
          <select
            className={'search-input'}
            name="animal"
            id="animal"
            value={animal}
            onChange={(e) => {
              setAnimal(e.target.value)
            }}
            onBlur={(e) => {
              setAnimal(e.target.value)
            }}
          >
            <option />
            {ANIMALS.map((animal) => (
              <option key={animal} value={animal}>
                {animal}
              </option>
            ))}
          </select>
        </label>

        <label htmlFor="breed">
          Breed
          <select
            disabled={!breeds.length}
            id="breed"
            name="breed"
            className={'search-input disabled-grey'}
          >
            <option />
            {breeds.map((breed) => (
              <option key={breed} value={breed}>
                {breed}
              </option>
            ))}
          </select>
        </label>

        <button
          className={
            'rounded bg-orange-500 px-6 py-2 text-white hover:bg-orange-400'
          }
        >
          Submit
        </button>
      </form>

      <Results pets={pets} />
    </div>
  )
}

export default SearchParams
