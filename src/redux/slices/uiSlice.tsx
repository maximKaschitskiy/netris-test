import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { UIType, EventType } from '../../types'

  const initialStore: UIType = {
    paused: true,
    currentTime: 0,
    width: 0,
    height: 0,
    eventsList: [],
    currentEvents: [],
  }

  const uiSlice = createSlice({
    name: 'ui',
    initialState: initialStore,
    reducers: {
      setEventsList(state, action: PayloadAction<EventType[]>) {
        return { ...state, eventsList: action.payload };
      },
      setCurrentEvents(state, action: PayloadAction<EventType[]>) {
        return { ...state, currentEvents: action.payload };
      },
    },
  })
  
const { setEventsList, setCurrentEvents } = uiSlice.actions

const uiReducer = uiSlice.reducer

export { setEventsList, setCurrentEvents, uiReducer }