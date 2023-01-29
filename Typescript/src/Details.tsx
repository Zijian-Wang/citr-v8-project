import { useNavigate, useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { useContext, useState } from 'react'
import AdoptedPetContext from './AdoptedPetContext'
import Modal from './Modal'
import ErrorBoundary from './ErrorBoundary'
import fetchPet from './fetchPet'
import Carousel from './Carousel'

const Details = () => {
  const { id } = useParams()
  if (!id) {
    throw new Error('id is undefined!!!')
  }
  const [showModal, setShowModal] = useState(false)
  const navigate = useNavigate()
  const results = useQuery(['details', id], fetchPet)
  // eslint-disable-next-line no-unused-vars
  const [, setAdoptedPet] = useContext(AdoptedPetContext)

  if (results.isLoading) {
    return (
      <div className="loading-pane">
        <h2 className="loader">🌀</h2>
      </div>
    )
  }

  if (!results.data || !results.data.pets) {
    throw new Error('results.data is undefined!!!')
  }

  const pet = results?.data?.pets[0]
  if (!pet) {
    throw new Error('pet is undefined!!!')
  }

  return (
    <div className="details">
      <Carousel images={pet.images} />
      <div>
        <h1>{pet.name}</h1>
        <h2>{`${pet.animal} — ${pet.breed} — ${pet.city}, ${pet.state}`}</h2>
        <button onClick={() => setShowModal(true)}>Adopt {pet.name}</button>
        <p>{pet.description}</p>
        {showModal ? (
          <Modal>
            <div>
              <h1>Would you like to adopt {pet.name}?</h1>
              <div className="buttons">
                <button
                  onClick={() => {
                    setAdoptedPet(pet)
                    navigate('/')
                  }}
                >
                  Yes
                </button>
                <button onClick={() => setShowModal(false)}>No</button>
              </div>
            </div>
          </Modal>
        ) : null}
      </div>
    </div>
  )
}

export default function DetailsErrorBoundary() {
  return (
    <ErrorBoundary>
      <Details />
    </ErrorBoundary>
  )
}
