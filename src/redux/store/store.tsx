import { configureStore } from "@reduxjs/toolkit"
import { uiReducer } from "../slices/uiSlice"

const store = configureStore({
  reducer: {
    ui: uiReducer
  },
})

type RootState = ReturnType<typeof store.getState>
type AppDispatch = typeof store.dispatch

export type { RootState, AppDispatch }
export { store }