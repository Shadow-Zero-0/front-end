import { configureStore } from '@reduxjs/toolkit'
// Or from '@reduxjs/toolkit/query/react'
import { setupListeners } from '@reduxjs/toolkit/query'
import { onepokemonApi, pokemonApi } from './pokemon'
import counterReducer from './counterSlice'
export const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    counter: counterReducer,
    [pokemonApi.reducerPath]: pokemonApi.reducer,
    [onepokemonApi.reducerPath]: onepokemonApi.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(pokemonApi.middleware).concat(onepokemonApi.middleware),
})

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch)