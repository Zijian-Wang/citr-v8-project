import { expect, test } from 'vitest'
import { renderHook } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import useBreedList from '../useBreedList'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity,
      retry: false,
    },
  },
})

test('gives an empty list if no animal provided', async () => {
  const { result } = renderHook(() => useBreedList(''), {
    wrapper: ({ children }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    ),
  })

  const [breedList, status] = result.current

  expect(breedList).toHaveLength(0)
  expect(status).toBe('loading')
})
