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
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AdoptedPetContext.Provider value={adoptedPets}>
          <header>
            <Link to="/">Adopt Me!</Link>
          </header>
          <Routes>
            <Route path="/details/:id" element={<DetailsErrorBoundary />} />
            <Route path="/" element={<SearchParams />} />
          </Routes>
        </AdoptedPetContext.Provider>
      </QueryClientProvider>
    </BrowserRouter>
  )
}

const container = document.getElementById('root')
const root = createRoot(container)
root.render(<App />)
