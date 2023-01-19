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

  // if pet is adopted, update the AdptedPet and redirect to home page
  const navigate = useNavigate()
  const [, setAdoptedPet] = useContext(AdoptedPetContext)

  if (results.isLoading) {
    return (
      <div className="loading-pane">
        <h2 className="loader">🌀</h2>
      </div>
    )
  }

  const pet = results.data.pets[0]

  return (
    <div className="details">
      <Carousel images={pet.images} />
      <div>
        <h1>{pet.name}</h1>
        <h2>
          {pet.animal} – {pet.breed} – {pet.city}, {pet.state}
          <button onClick={() => setShowModal(true)}>Adopt {pet.name}</button>
          <p> {pet.description} </p>
          {/* Show Modal that renders to another div on App.js level */}
          {showModal ? (
            <Modal>
              <div>
                <h1>Would you like to adopt {pet.name}? </h1>
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
