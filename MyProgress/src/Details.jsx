import { useState, useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import fetchPet from './fetchPet'
import Carousel from './Carousel'
import ErrorBoundary from './ErrorBoundary'
import Modal from './Modal'
import AdoptedPetContext from './AdoptedPetContext'

const Details = () => {
  // Pulls the id from router
  const { id } = useParams()
  // Fetches the pet from the API using useQuery
  const results = useQuery(['details', id], fetchPet)

  const [showModal, setShowModal] = useState(false)

  // if pet is adopted, update the AdoptedPet and redirect to home page
  const navigate = useNavigate()
  const [, setAdoptedPet] = useContext(AdoptedPetContext)

  if (results.isLoading) {
    return (
      <div className='flex h-full w-full'>
        <h2 className='m-auto max-w-lg animate-spin object-fill'>🌀</h2>
      </div>
    )
  }

  const pet = results.data.pets[0]

  return (
    <div className='mx-auto flex w-10/12 flex-col justify-around rounded-2xl bg-gray-50 py-10 px-10 shadow-2xl'>
      <Carousel images={pet.images} />
      <div className=''>
        <h1 className='m-0 mt-8 mb-4 w-10/12 overflow-ellipsis whitespace-nowrap text-6xl accent-gray-800'>
          {pet.name}
        </h1>
        <h2 className='flex-col text-xl'>
          {pet.animal} – {pet.breed} – {pet.city}, {pet.state}
          <p> {pet.description} </p>
          <button
            className='mx-auto my-4 flex w-full place-content-center rounded-lg bg-orange-400 p-2 font-medium text-white'
            onClick={() => setShowModal(true)}
          >
            Adopt {pet.name}
          </button>
          {/* Show Modal that renders to another div on App.js level */}
          {showModal ? (
            <Modal>
              <div className='absolute z-40 flex w-8/12 flex-col place-content-center justify-between rounded-3xl border-4 border-orange-500 bg-white px-10 py-3'>
                <h1 className='ml-auto mt-8 text-center text-6xl'>
                  Would you like to adopt {pet.name}?{' '}
                </h1>
                <div className='mb-12 grid-cols-2 gap-x-8 text-2xl'>
                  <button
                    className='mt-12 flex w-full place-content-center rounded-lg bg-orange-500 p-2 font-medium text-white'
                    onClick={() => {
                      setAdoptedPet(pet)
                      navigate('/')
                    }}
                  >
                    {' '}
                    Yes
                  </button>
                  <button
                    className='flex w-full place-content-center rounded-lg border-4 border-red-500 bg-white p-2 font-medium text-gray-800'
                    onClick={() => setShowModal(false)}
                  >
                    No
                  </button>
                </div>
              </div>
            </Modal>
          ) : null}
        </h2>
      </div>
    </div>
  )
}

// this wrapping way can also catch errors happening in the Details component that did not get returned,
//  like "if (results.isLoading)" lines, that are above the return statement
function DetailsErrorBoundary(props) {
  return (
    <ErrorBoundary>
      <Details {...props} />
    </ErrorBoundary>
  )
}

export default DetailsErrorBoundary
