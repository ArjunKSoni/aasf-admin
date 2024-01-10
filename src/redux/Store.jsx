import { configureStore } from '@reduxjs/toolkit'
import Auth from './Auth'

const Store = configureStore({
  reducer:{
    Token:Auth,
  },
})

export default Store;