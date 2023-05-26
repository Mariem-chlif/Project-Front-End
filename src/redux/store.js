import { createStore, applyMiddleware, compose } from 'redux'
import { configureStore } from '@reduxjs/toolkit'

import thunk from 'redux-thunk'
import createReducer from './reducers'

const initialState = {}

const middleware = [thunk]

const store = configureStore({
       reducer: createReducer(),
       initialState,
       middleware: (getDefaultMiddleware) =>
              getDefaultMiddleware({
                     immutableCheck: false,
                     serializableCheck: false,
              }).concat(middleware),
       devTools: process.env.NODE_ENV === 'development',
})

export default store
