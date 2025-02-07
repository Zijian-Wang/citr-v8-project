import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import DetailsErrorBoundary from './Details'
import SearchParams from './SearchParams'
import AdoptedPetContext from './AdoptedPetContext'
import { useState } from 'react'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity,
    },
  },
})

const App = () => {
  const adoptedPets = useState(null)

  return (
    <div
      className='m-0 p-0'
      style={{
        background: 'url(http://pets-images.dev-apis.com/pets/wallpaperA.jpg',
      }}
    >
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <AdoptedPetContext.Provider value={adoptedPets}>
            <header className=' mb-10 w-full bg-gradient-to-b from-yellow-400 via-orange-500 to-red-500 p-7 text-center '>
              <Link to='/' className=' text-6xl text-white hover:text-gray-300'>
                Adopt Me!
              </Link>
            </header>
            <Routes>
              <Route path='/details/:id' element={<DetailsErrorBoundary />} />
              <Route path='/' element={<SearchParams />} />
            </Routes>
          </AdoptedPetContext.Provider>
        </QueryClientProvider>
      </BrowserRouter>
    </div>
  )
}

const container = document.getElementById('root')
const root = createRoot(container)
root.render(<App />)
