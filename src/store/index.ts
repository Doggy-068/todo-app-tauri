import { configureStore } from '@reduxjs/toolkit'
import themeReducer from './slice/theme.slice'

export default configureStore({
  reducer: {
    theme: themeReducer
  }
})
